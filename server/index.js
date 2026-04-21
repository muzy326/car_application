console.log("🔥 Backend container starting...");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db'); // DB pool
const app = express();
const PORT = process.env.PORT || 3000;

// ------------------ MIDDLEWARE ------------------
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',  // safer for AWS test
  credentials: true
}));

app.use(express.json());

// ------------------ ROUTES ------------------
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Chat
const chatController = require('./controllers/chatController');
app.post('/api/chat', chatController.chat);
app.post('/api/chat/send', chatController.sendMessage);

// Test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// ------------------ DB CHECK (FIXED) ------------------
const waitForDB = async () => {
  try {
    await pool.query('SELECT 1');  // ✅ safer than pool.connect()
    console.log("✅ DB connected");

    app.listen(PORT, '0.0.0.0', () => {
      console.log("🚀 Server started successfully");
      console.log("PORT:", PORT);
    });

  } catch (err) {
    console.error("❌ DB ERROR:", err.message);

    console.log("⏳ Retrying DB connection in 5 seconds...");
    setTimeout(waitForDB, 5000); // retry instead of crash
  }
};

waitForDB();