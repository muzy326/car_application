// // const express = require('express');
// // const cors = require('cors');
// // const path = require('path');
// // require('dotenv').config();

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // const chatController = require('./controllers/chatController');
// // // ------------------ MIDDLEWARE ------------------
// // app.use(cors({
// //   origin: process.env.FRONTEND_URL || 'http://localhost:4200',
// //   credentials: true
// // }));
// // app.use(express.json());

// // // Serve uploads
// // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // ------------------ API ROUTES ------------------
// // app.use('/api/users', require('./routes/userRoutes'));
// // app.use('/api/cars', require('./routes/carRoutes'));
// // app.use('/api/bookings', require('./routes/bookingRoutes'));
// // app.use('/api/payments', require('./routes/paymentRoutes'));
// // app.post('/api/chat', chatController.chat);
// // app.post('/api/chat/send', chatController.sendMessage);

// // // Test route
// // app.get('/api/test', (req, res) => res.json({ message: 'Server is running!' }));

// // // ------------------ SERVE ANGULAR ------------------
// // const angularDistPath = path.join(__dirname, 'dist', 'car-application', 'browser');
// // app.use(express.static(angularDistPath));

// // // SPA fallback (use app.use instead of app.get)
// // app.use((req, res, next) => {
// //   if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
// //     res.sendFile(path.join(angularDistPath, 'index.html'));
// //   } else {
// //     next();
// //   }
// // });

// // // ------------------ GLOBAL ERROR HANDLER ------------------
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(err.status || 500).json({
// //     error: err.message || 'Internal Server Error'
// //   });
// // });

// // // // ------------------ START SERVER ------------------
// // // app.listen(PORT, () => {
// // //   console.log(`🚀 Server running on port ${PORT}`);
// // // });

// // if (process.env.NODE_ENV !== 'test') {
// //   app.listen(PORT, () => {
// //     console.log(`🚀 Server running on port ${PORT}`);
// //   });
// // }

// // module.exports = app;
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // ------------------ MIDDLEWARE ------------------
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:4200',
//   credentials: true
// }));
// app.use(express.json());

// // ------------------ API ROUTES ------------------
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/cars', require('./routes/carRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));

// const chatController = require('./controllers/chatController');
// app.post('/api/chat', chatController.chat);
// app.post('/api/chat/send', chatController.sendMessage);

// // Test route
// app.get('/api/test', (req, res) => res.json({ message: 'Server is running!' }));

// // ------------------ SERVE ANGULAR (ONLY IF BUILT) ------------------
// const angularDistPath = path.join(__dirname, 'dist', 'car-application', 'browser');

// const fs = require('fs');
// if (fs.existsSync(angularDistPath)) {
//   app.use(express.static(angularDistPath));

//   // SPA fallback
//   app.use((req, res, next) => {
//     if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
//       res.sendFile(path.join(angularDistPath, 'index.html'));
//     } else {
//       next();
//     }
//   });
// } else {
//   console.log('⚠️ Angular dist folder not found. Running in dev mode (ng serve)');
// }

// // ------------------ GLOBAL ERROR HANDLER ------------------
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     error: err.message || 'Internal Server Error'
//   });
// });

// // // ------------------ START SERVER ------------------
// // if (process.env.NODE_ENV !== 'test') {
// //   app.listen(PORT, () => {
// //     console.log(`🚀 Server running on port ${PORT}`);
// //   });
// // }
// if (process.env.NODE_ENV !== 'test') {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// } else {
//   console.log("🧪 Running in TEST mode");
// }
// module.exports = app;

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

// // ------------------ START SERVER ------------------
// if (process.env.NODE_ENV !== 'test') {
//   function startServer() {
//   app.listen(PORT, () => {
//     console.log(`🚀 Backend running on port ${PORT}`);
//   });
// } 
// }
// // Only start server if NOT testing
// if (process.env.NODE_ENV !== 'test') {
//   startServer();
// } else {
//   console.log("🧪 Running in TEST mode (server NOT started)");
// }


// module.exports = app;
function startServer() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
  });
}

startServer();

module.exports = app;