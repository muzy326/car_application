const express = require('express');
const router = express.Router();
const pool = require('../db');
const { chat } = require('../controllers/chatController');
const { authenticateToken, authorizeRoles } = require('../middleware');



router.post('/', chat);


module.exports = router;