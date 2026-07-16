
const db = require('../db');

// Create booking
const createBooking = async (booking) => {
  const {
    userId,
    carId,
    startDate,
    endDate,
    status
  } = booking;

  const result = await db.query(
    `INSERT INTO bookings
    (user_id, car_id, start_date, end_date, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      userId,
      carId,
      startDate,
      endDate,
      status || 'Pending'
    ]
  );

  return result.rows[0];
};

// Get all bookings
const getAllBookings = async () => {
  const result = await db.query(
    'SELECT * FROM bookings ORDER BY id'
  );

  return result.rows;
};

// Get booking by ID
const getBookingById = async (id) => {
  const result = await db.query(
    'SELECT * FROM bookings WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

// Delete booking
const deleteBooking = async (id) => {
  await db.query(
    'DELETE FROM bookings WHERE id = $1',
    [id]
  );
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  deleteBooking
};