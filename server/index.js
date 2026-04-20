
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ------------------ MIDDLEWARE ------------------
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());

// ------------------ DATABASE ROUTES ------------------
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// ------------------ CHAT ROUTES ------------------
const chatController = require('./controllers/chatController');
app.post('/api/chat', chatController.chat);
app.post('/api/chat/send', chatController.sendMessage);

// ------------------ TEST ROUTE ------------------
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});
// ------------------ HEALTH CHECK (IMPORTANT FOR DOCKER) ------------------
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});
// ------------------ GLOBAL ERROR HANDLER ------------------
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});
app.listen(PORT, '0.0.0.0', () => {
  console.log("🚀 Server started successfully");
  console.log("PORT:", PORT);
});


// module.exports = app;