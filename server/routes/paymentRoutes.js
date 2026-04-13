const express = require('express');
const router = express.Router();
const pool = require('../db');
const paymentController = require('../controllers/paymentController');
const { authenticateToken, authorizeRoles } = require('../middleware');


router.get('/', authenticateToken, authorizeRoles(['Admin']), paymentController.getAllPayments);
router.post('/', authenticateToken, authorizeRoles(['Admin']), paymentController.createPayment);
router.put('/:id', authenticateToken, authorizeRoles(['Admin']), paymentController.updatePayment);
router.delete('/:id', authenticateToken, authorizeRoles(['Admin']), paymentController.deletePayment);

// Create payment (protected)
router.post('/', authenticateToken, async (req, res) => {
  const { booking_id, amount, method } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO payments (user_id, booking_id, amount, method) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, booking_id, amount, method]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Get all payments (Admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

// Get user payments (Protected)
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments WHERE user_id=$1', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
});

module.exports = router;