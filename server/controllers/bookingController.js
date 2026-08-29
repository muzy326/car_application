const pool = require('../db');
const axios = require('axios');
const isValidId = (id) => /^\d+$/.test(id);

const N8N_BOOKING_WEBHOOK_URL = process.env.N8N_BOOKING_WEBHOOK_URL;

// --------------------------
// SHARED: NOTIFY N8N (EMAIL + WHATSAPP) — FIRE AND FORGET
// --------------------------
async function notifyBookingCreated(booking, car, user) {
  if (!N8N_BOOKING_WEBHOOK_URL) {
    console.warn('⚠️ N8N_BOOKING_WEBHOOK_URL not set — skipping notifications');
    return;
  }
  try {
    await axios.post(N8N_BOOKING_WEBHOOK_URL, {
      bookingId: booking.id,
      carName: car.carname,
      pricePerDay: car.price,
      startDate: booking.start_date,
      endDate: booking.end_date,
      status: booking.status,
      customerName: user.firstname ? `${user.firstname} ${user.lastname}` : (user.name || 'Customer'),
      customerEmail: user.email,
      customerPhone: user.phonenumber
    }, { timeout: 8000 });
  } catch (err) {
    // Never let a notification failure break the booking itself
    console.error('🔥 Booking notification failed:', err.message);
  }
}

// --------------------------
// SHARED: CHECK AVAILABILITY
// --------------------------
async function isCarAvailable(carId, startDate, endDate, excludeBookingId = null) {
  const query = `
    SELECT id FROM bookings
    WHERE car_id = $1
      AND status != 'Cancelled'
      AND start_date < $3
      AND end_date > $2
      ${excludeBookingId ? 'AND id != $4' : ''}
  `;
  const params = excludeBookingId
    ? [carId, startDate, endDate, excludeBookingId]
    : [carId, startDate, endDate];

  const result = await pool.query(query, params);
  return result.rows.length === 0;
}

// --------------------------
// SHARED: CORE BOOKING LOGIC (used by manual + AI booking)
// --------------------------
async function bookCarCore({ userId, carId, startDate, endDate, status }) {
  const carCheck = await pool.query('SELECT id, carname, price FROM cars WHERE id = $1', [carId]);
  if (carCheck.rows.length === 0) {
    const err = new Error('Invalid car ID');
    err.statusCode = 400;
    throw err;
  }
  const car = carCheck.rows[0];

  const available = await isCarAvailable(carId, startDate, endDate);
  if (!available) {
    const err = new Error(`${car.carname} is already booked for those dates`);
    err.statusCode = 409;
    throw err;
  }

  const result = await pool.query(
    `INSERT INTO bookings (user_id, car_id, start_date, end_date, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      userId,
      carId,
      startDate,
      endDate,
      status?.toLowerCase() === 'confirmed' ? 'Confirmed' : 'Pending'
    ]
  );
  const booking = result.rows[0];

  // Fetch user for notification (non-blocking — fire and forget, never awaited by caller)
  pool.query('SELECT firstname, lastname, email, phonenumber FROM users WHERE id = $1', [userId])
    .then(userResult => {
      if (userResult.rows.length > 0) {
        notifyBookingCreated(booking, car, userResult.rows[0]);
      }
    })
    .catch(err => console.error('🔥 Failed to fetch user for notification:', err.message));

  return { booking, car };
}

// --------------------------
// GET ALL BOOKINGS (ADMIN)
// --------------------------
exports.getAllBookings = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM bookings ORDER BY id ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// --------------------------
// GET MY BOOKINGS (USER)
// --------------------------
exports.getUserBookings = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT 
        b.*,
        u.firstname,
        u.lastname,
        u.email,
        u.phonenumber,
        c.carname,
        c.type,
        c.price
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN cars c ON b.car_id = c.id
      WHERE b.user_id = $1
      ORDER BY b.start_date DESC
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user bookings' });
  }
};

// --------------------------
// GET SINGLE BOOKING (SAFE)
// --------------------------
exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) return res.status(400).json({ message: 'Invalid booking ID' });

  try {
    const result = await pool.query(`
      SELECT 
        b.*,
        u.firstname,
        u.lastname,
        u.email,
        u.phonenumber,
        c.carname,
        c.type,
        c.price
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN cars c ON b.car_id = c.id
      WHERE b.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = result.rows[0];

    // Only admin or owner
    if (req.user.role !== 'admin' && req.user.id !== booking.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching booking' });
  }
};

// --------------------------
// GET BOOKINGS BY USER
// --------------------------
exports.getBookingsByUser = async (req, res) => {
  const { userId } = req.params;

  if (req.user.role !== 'admin' && req.user.id != userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM bookings WHERE user_id = $1 ORDER BY start_date DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user bookings' });
  }
};

// --------------------------
// CREATE BOOKING (SAFE FIXED)
// --------------------------
exports.createBooking = async (req, res) => {
  try {
    const { user_id, car_id, start_date, end_date, status } = req.body;

    // fallback user logic
    const bookingUserId =
      req.user.role?.toLowerCase() === 'admin' && user_id
        ? Number(user_id)
        : req.user.id;

    // validate required fields
    if (!bookingUserId || !car_id || !start_date || !end_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // --------------------------
    // CHECK USER (admin only)
    // --------------------------
    if (req.user.role?.toLowerCase() === 'admin' && user_id) {
      const userCheck = await pool.query(
        'SELECT id FROM users WHERE id = $1',
        [Number(user_id)]
      );

      if (userCheck.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
    }

    // --------------------------
    // CHECK CAR + AVAILABILITY + INSERT + NOTIFY (shared logic)
    // --------------------------
    const { booking, car } = await bookCarCore({
      userId: bookingUserId,
      carId: Number(car_id),
      startDate: start_date,
      endDate: end_date,
      status
    });

    // --------------------------
    // RESPONSE
    // --------------------------
    return res.status(201).json({
      ...booking,
      pricePerDay: car.price
    });

  } catch (err) {
    console.error('BOOKING ERROR:', err);
    return res.status(err.statusCode || 500).json({
      message: err.message || 'Error creating booking'
    });
  }
};

// --------------------------
// UPDATE BOOKING STATUS (SAFE)
// --------------------------
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!isValidId(id)) return res.status(400).json({ message: 'Invalid booking ID' });
  if (!status) return res.status(400).json({ message: 'Status is required' });

  try {
    // Check if booking exists
    const bookingCheck = await pool.query(`SELECT user_id FROM bookings WHERE id = $1`, [id]);
    if (bookingCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = bookingCheck.rows[0];

    // Only admin or owner can update
    if (req.user.role !== 'admin' && req.user.id !== booking.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update status
    const result = await pool.query(
      `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating booking' });
  }
};

// --------------------------
// DELETE BOOKING (SAFE)
// --------------------------
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) return res.status(400).json({ message: 'Invalid booking ID' });

  try {
    // Check if booking exists
    const bookingCheck = await pool.query(`SELECT user_id FROM bookings WHERE id = $1`, [id]);
    if (bookingCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = bookingCheck.rows[0];

    // Only admin or owner can delete
    if (req.user.role !== 'admin' && req.user.id !== booking.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete booking
    await pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);

    res.json({ message: `Booking with ID ${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting booking' });
  }
};

// --------------------------
// CURRENT BOOKINGS (ALL FUTURE BOOKINGS)
// --------------------------
exports.getCurrentBookings = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT 
        b.*,
        c.carname,
        c.price AS pricePerDay
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      WHERE b.user_id = $1
        AND b.end_date >= NOW()  -- include all ongoing/future bookings
      ORDER BY b.start_date ASC
    `, [userId]);

    // Map total price for frontend
    const bookings = result.rows.map(b => {
      const start = new Date(b.start_date);
      const end = new Date(b.end_date);
      let totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      totalDays = Math.max(totalDays, 1);
      return {
        ...b,
        totalPrice: parseFloat((totalDays * b.pricePerDay).toFixed(2))
      };
    });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching current bookings' });
  }
};

// --------------------------
// BOOKING HISTORY (ALL PAST BOOKINGS)
// --------------------------
exports.getBookingHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT 
        b.*,
        c.carname,
        c.price AS pricePerDay
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      WHERE b.user_id = $1
        AND b.end_date < NOW()  -- all past bookings
      ORDER BY b.start_date DESC
    `, [userId]);

    const bookings = result.rows.map(b => {
      const start = new Date(b.start_date);
      const end = new Date(b.end_date);
      let totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      totalDays = Math.max(totalDays, 1);
      return {
        ...b,
        totalPrice: parseFloat((totalDays * b.pricePerDay).toFixed(2))
      };
    });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching booking history' });
  }
};

// --------------------------
// GET BOOKING BILL (SAFE)
// --------------------------
exports.getBookingBill = async (req, res) => {
  const { bookingId } = req.params;

  if (!isValidId(bookingId)) return res.status(400).json({ message: 'Invalid booking ID' });

  try {
    const result = await pool.query(`
      SELECT 
        b.id AS "bookingId",
        b.user_id,
        b.start_date AS "startDate",
        b.end_date AS "endDate",
        b.status,
        u.firstname,
        u.lastname,
        u.email,
        c.carname,
        c.price
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN cars c ON b.car_id = c.id
      WHERE b.id = $1
    `, [bookingId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = result.rows[0];

    // Security: only admin or owner
    if (req.user.role !== 'admin' && req.user.id !== booking.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    let totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    totalDays = Math.max(totalDays, 1);

    const totalAmount = parseFloat((totalDays * booking.price).toFixed(2));

    res.json({
      bookingId: booking.bookingId,
      customerName: `${booking.firstname} ${booking.lastname}`,
      email: booking.email,
      car: booking.carname,
      pricePerDay: booking.price,
      totalDays,
      totalAmount,
      status: booking.status
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating bill' });
  }
};

// --------------------------
// EXPORT SHARED HELPERS (for aiController to reuse)
// --------------------------
exports.isCarAvailable = isCarAvailable;
exports.bookCarCore = bookCarCore;