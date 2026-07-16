process.on("uncaughtException", (err) => {
  console.error("🔥 CRASH:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("🔥 PROMISE ERROR:", err);
});

// ------------------ ENV SETUP ------------------
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log("🔥 Backend starting...");

// ------------------ DEBUG ENV ------------------
console.log("ENV CHECK:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// ------------------ IMPORTS ------------------
const express = require('express');
const cors = require('cors');
const pool = require('./db');




const app = express();
const PORT = process.env.PORT || 3000;

// ------------------ MIDDLEWARE ------------------
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));




app.use(express.json());

app.use((req, res, next) => {
  console.log('➡️ REQUEST:', req.method, req.url);
  console.log('AUTH HEADER:', req.headers.authorization);
  next();
});

// ------------------ ROUTES ------------------
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));



// Chat routes
const chatController = require('./controllers/chatController');
app.post('/api/chat', chatController.chat);
app.post('/api/chat/send', chatController.sendMessage);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

async function connectDB() {
    try {
        await pool.query('SELECT 1');
        console.log('✅ PostgreSQL connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// // ------------------ START SERVER ------------------
// connectDB().then(() => {
//   app.listen(PORT, '0.0.0.0', () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// });
// app.listen(3000, () => {
//   console.log("Backend running on port 3000");
// });
connectDB().then(() => {
  app.listen(PORT || 3000, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
// ✅ IMPORTANT: export for testing
