const express = require('express');
const router = express.Router();
const pool = require('../db');
const paymentController = require('../controllers/paymentController');
const { authenticateToken, authorizeRoles } = require('../middleware');


router.get('/', authenticateToken, authorizeRoles(['Admin']), paymentController.getAllPayments);
router.post('/', authenticateToken, paymentController.createPayment);
router.put('/:id', authenticateToken, authorizeRoles(['Admin']), paymentController.updatePayment);
router.delete('/:id', authenticateToken, authorizeRoles(['Admin']), paymentController.deletePayment);

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