// index.js - Fully Corrected Backend (keeps your code intact)

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(bodyParser.json());

// PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'car_application',
  password: process.env.DB_PASSWORD || 'Mujeeba123@',
  port: process.env.DB_PORT || 5432,

});



// JWT Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) return res.status(401).json({ message: 'Unauthorized. Please login again.' });

  jwt.verify(token, process.env.JWT_SECRET || 'demo_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Role-based middleware
function authorizeRoles(roles = []) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    next();
  };
}

// ================= USERS ROUTES =================

// GET all users
app.get('/api/users', authenticateToken, authorizeRoles(['Admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, firstname, lastname, email, role, phonenumber FROM users ORDER BY id ASC'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single user by ID
app.get('/api/users/:id', authenticateToken, authorizeRoles(['Admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, firstname, lastname, email, role, phonenumber FROM users WHERE id=$1',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE / REGISTER new user
app.post('/api/users', authenticateToken, authorizeRoles(['Admin']), async (req, res) => {
  const { firstname, lastname, email, password, role, phonenumber } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existing = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (existing.rows.length > 0) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'User';

    const result = await pool.query(
      'INSERT INTO users (firstname, lastname, email, password, role, phonenumber) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, firstname, lastname, email, role, phonenumber',
      [firstname, lastname, email, hashedPassword, userRole, phonenumber || null]
    );

    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE user
app.put('/api/users/:id', authenticateToken, authorizeRoles(['Admin']), async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password, role, phonenumber } = req.body;

  try {
    let result;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      result = await pool.query(
        `UPDATE users
         SET firstname=$1, lastname=$2, email=$3, password=$4, role=$5, phonenumber=$6
         WHERE id=$7
         RETURNING id, firstname, lastname, email, role, phonenumber`,
        [firstname, lastname, email, hashedPassword, role || 'User', phonenumber || null, id]
      );
    } else {
      result = await pool.query(
        `UPDATE users
         SET firstname=$1, lastname=$2, email=$3, role=$4, phonenumber=$5
         WHERE id=$6
         RETURNING id, firstname, lastname, email, role, phonenumber`,
        [firstname, lastname, email, role || 'User', phonenumber || null, id]
      );
    }

    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE user
app.delete('/api/users/:id', authenticateToken, authorizeRoles(['Admin']), async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: `User with ID ${id} deleted successfully` });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// ================= LOGIN ROUTE =================
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { id: user.id, firstname: user.firstname, role: user.role },
      process.env.JWT_SECRET || 'demo_secret',
      { expiresIn: '8h' }
    );

    res.json({ token, user: { id: user.id, firstname: user.firstname, role: user.role, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

//   try {
//     const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
//     const user = result.rows[0];
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

//     const token = jwt.sign(
//       { id: user.id, firstname: user.firstname, role: user.role },
//       process.env.JWT_SECRET || 'demo_secret',
//       { expiresIn: '24h' }
//     );

//     res.json({
//       message: `Welcome ${user.firstname}`,
//       user: { id: user.id, firstname: user.firstname, role: user.role },
//       token
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// GET all cars
app.get('/api/cars', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY id ASC');

    // Map database rows to frontend-friendly keys
    const cars = result.rows.map(car => ({
      id: car.id,
      carname: car.carname,
      price: car.price,
      imageUrl: car.imageUrl || '',                 // frontend expects lowercase key
      description: car.description || 'No description available',
      available: car.available,
      type: car.type
    }));

    res.json(cars);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ message: 'Error fetching cars' });
  }
});

// GET single car
app.get('/api/cars/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM cars WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });

    const car = result.rows[0];
    const mappedCar = {
      id: car.id,
      carname: car.carname,
      price: car.price,
      imageUrl: car.imageUrl || '',
      description: car.description || 'No description available',
      available: car.available,
      type: car.type
    };

    res.json(mappedCar);
  } catch (err) {
    console.error('Error fetching car:', err);
    res.status(500).json({ message: 'Error fetching car' });
  }
});

// CREATE car (Admin)
app.post('/api/cars', authenticateToken, authorizeRoles(['Admin']), async (req, res) => {
  try {
    const { carname, price, imageUrl, available, description, type } = req.body;

    if (!carname || price === undefined || price === null) {
      return res.status(400).json({ message: 'Car name and price are required' });
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ message: 'Price must be a positive number' });
    }

    const result = await pool.query(
      `INSERT INTO cars (carname, price, "imageUrl", available, "description", type)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        carname,
        numericPrice,
        imageUrl?.trim() || '',
        available !== undefined ? Boolean(available) : true,
        description?.trim() || '',
        type?.trim() || ''
      ]
    );

    const car = result.rows[0];

    // Map to frontend keys
    const mappedCar = {
      id: car.id,
      carname: car.carname,
      price: car.price,
      imageUrl: car.imageUrl || '',
      description: car.description || 'No description available',
      available: car.available,
      type: car.type
    };

    res.status(201).json({
      message: 'Car created successfully',
      car: mappedCar
    });
  } catch (err) {
    console.error('Full database error:', err);
    res.status(500).json({ message: 'Internal server error while adding car' });
  }
});

// UPDATE car (Admin)
app.put('/api/cars/:id', authenticateToken, authorizeRoles(['Admin']), async (req, res) => {
  const { id } = req.params;
  let { carname, price, imageUrl, available, description, type } = req.body;

  if (!carname || price === undefined || price === null) {
    return res.status(400).json({ message: 'Car name and price are required' });
  }

  price = Number(price);
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }

  try {
    const result = await pool.query(
      `UPDATE cars
       SET carname=$1,
           price=$2,
           "imageUrl"=$3,
           available=$4,
           "description"=$5,
           type=$6
       WHERE id=$7
       RETURNING *`,
      [
        carname,
        price,
        imageUrl?.trim() || '',
        available !== undefined ? Boolean(available) : true,
        description?.trim() || '',
        type?.trim() || '',
        id
      ]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });

    const car = result.rows[0];

    // Map to frontend keys
    const mappedCar = {
      id: car.id,
      carname: car.carname,
      price: car.price,
      imageUrl: car.imageUrl || '',
      description: car.description || 'No description available',
      available: car.available,
      type: car.type
    };

    res.json({
      message: 'Car updated successfully',
      car: mappedCar
    });
  } catch (err) {
    console.error('Error updating car:', err);
    res.status(500).json({ message: 'Internal server error while updating car' });
  }
});

// DELETE car (Admin)
app.delete('/api/cars/:id', authenticateToken, authorizeRoles(['Admin']), async (req, res) => {
  const { id } = req.params;
  console.log("Delete request received for id:", id);
  try {
    const result = await pool.query('DELETE FROM cars WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: `Car with ID ${id} deleted successfully` });
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).json({ message: 'Error deleting car' });
  }
});
// --------------------------
// BOOKINGS ROUTES (CLEAN VERSION)
// --------------------------

// ✅ Get ALL bookings (Admin)
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// ✅ Get MY bookings (Logged-in user)
app.get('/api/bookings/my-bookings', authenticateToken, async (req, res) => {
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
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// ✅ Get SINGLE booking (Admin OR Owner)
app.get('/api/bookings/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

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

    // ✅ SECURITY CHECK
    if (req.user.role !== 'admin' && req.user.id !== booking.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching booking' });
  }
});

// ✅ Get bookings by user (Admin OR same user)
app.get('/api/bookings/user/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  if (req.user.role !== 'admin' && req.user.id != userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id=$1 ORDER BY start_date DESC',
      [userId]
    );
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user bookings' });
  }
});

// ✅ Create booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  const { user_id, car_id, start_date, end_date, status } = req.body;

  if (!user_id || !car_id || !start_date || !end_date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings (user_id, car_id, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, car_id, start_date, end_date, status || 'Pending']
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// ✅ Update booking status (Admin)
app.put('/api/bookings/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating booking' });
  }
});

// ✅ Delete booking
app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM bookings WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: `Booking with ID ${id} deleted successfully` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting booking' });
  }
});

// --------------------------
// USER-SPECIFIC BOOKINGS
// --------------------------

// ✅ Current bookings
app.get('/api/bookings/my-bookings/current', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT 
        b.id,
        b.user_id AS "userId",
        b.car_id AS "carId",
        b.start_date AS "startDate",
        b.end_date AS "endDate",
        b.status,
        c.carname
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      WHERE b.user_id=$1 AND b.status='Pending'
      ORDER BY b.start_date
    `, [userId]);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching current bookings');
  }
});

// ✅ Booking history
app.get('/api/bookings/my-bookings/history', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT b.*, c.carname
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      WHERE b.user_id=$1 AND b.status!='Pending'
      ORDER BY b.start_date DESC
    `, [userId]);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching booking history');
  }
});

// -------------------- CHATBOT LOGIC --------------------
async function getChatResponse(message) {
  const lowerMsg = message.toLowerCase().trim();

  // 1️⃣ Greetings
  if (['hi', 'hello', 'hey'].includes(lowerMsg)) {
    return 'Hello! Welcome to our car rental service. 🚗 How can I help you today?';
  }

  // 2️⃣ Show cars
  if (lowerMsg.includes('car')) {
    try {
      const cars = await pool.query('SELECT * FROM cars LIMIT 5');
      return cars.rows.length
        ? cars.rows.map(c => `🚗 ${c.carname} - 💰 ${c.price} SAR`).join('\n')
        : 'Sorry, no cars are available right now.';
    } catch (err) {
      console.error('Database error (cars):', err);
      return 'Sorry, I cannot fetch cars at the moment.';
    }
  }

  // 3️⃣ Show bookings
  if (lowerMsg.includes('booking')) {
    try {
      const bookings = await pool.query('SELECT * FROM bookings LIMIT 5');
      return bookings.rows.length
        ? bookings.rows.map(b => `📅 Booking ID: ${b.id}`).join('\n')
        : 'You have no bookings.';
    } catch (err) {
      console.error('Database error (bookings):', err);
      return 'Sorry, I cannot fetch bookings at the moment.';
    }
  }

  // 4️⃣ Fallback
  return "I'm not sure about that. You can ask me about cars or your bookings!";
}

// -------------------- CHAT ROUTE --------------------
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Message is required.' });

  try {
    const reply = await getChatResponse(message);
    res.json({ reply });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ reply: 'Something went wrong on the server.' });
  }
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`Chatbot server running at http://localhost:${PORT}`);
});

// -------------------- PAYMENTS CRUD --------------------
app.get('/api/payments', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching payments');
  }
});

app.post('/api/payments', authenticateToken, async (req, res) => {
  const { bookingId, amount, method, status, paidAt } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO payments (booking_id, amount, method, status, paid_at) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [bookingId, amount, method, status || 'Pending', paidAt || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating payment');
  }
});

app.put('/api/payments/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { status, paidAt } = req.body;
  try {
    const result = await pool.query(
      'UPDATE payments SET status=$1, paid_at=$2 WHERE id=$3 RETURNING *',
      [status, paidAt || null, id]
    );
    if (result.rows.length === 0) return res.status(404).send('Payment not found');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating payment');
  }
});

app.delete('/api/payments/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM payments WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send('Payment not found');
    res.json({ message: `Payment with ID ${id} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting payment');
  }
});

// -------------------- TEST ROUTE --------------------
app.get('/', (req, res) => res.send('Server is running'));
app.get('/api/testdb', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database Error');
  }
});


// Serve Angular static files
app.use(express.static(
  path.join(__dirname, '/dist/car-application/browser')
));

// SPA fallback (VERY IMPORTANT — no wildcard here)
app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, '/dist/car-application/browser/index.html')
  );
});




// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

