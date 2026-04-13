const express = require('express');
const router = express.Router();
const pool = require('../db');
const { chat } = require('../controllers/chatController');
const { authenticateToken, authorizeRoles } = require('../middleware');



router.post('/', chat);
// Dummy chat route
router.post('/', authenticateToken, (req, res) => {
  const { message } = req.body;
  // Here you can integrate AI/chatbot logic
  res.json({ reply: `You said: ${message}` });
});


module.exports = router;