const pool = require('../db');


// Get all payments (Admin)
exports.getAllPayments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all payments:', err);
    res.status(500).json({ message: 'Database error fetching payments' });
  }
};

// Create a new payment
exports.createPayment = async (req, res) => {
  const { bookingId, amount, method, status, paidAt } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO payments (booking_id, amount, method, status, paid_at) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [bookingId, amount, method, status || 'Pending', paidAt || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ message: 'Database error creating payment' });
  }
};

// Get payments of logged-in user
exports.getUserPayments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments WHERE user_id=$1', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching user payments:', err);
    res.status(500).json({ message: 'Database error fetching user payments' });
  }
};

// Update payment by ID
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { status, paidAt } = req.body;
  try {
    const result = await pool.query(
      'UPDATE payments SET status=$1, paid_at=$2 WHERE id=$3 RETURNING *',
      [status, paidAt || null, id]
    );
    if (!result.rows.length) return res.status(404).json({ message: 'Payment not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error updating payment ID ${id}:`, err);
    res.status(500).json({ message: 'Database error updating payment' });
  }
};

// Delete payment by ID
exports.deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM payments WHERE id=$1 RETURNING *', [id]);
    if (!result.rows.length) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: `Payment with ID ${id} deleted` });
  } catch (err) {
    console.error(`Error deleting payment ID ${id}:`, err);
    res.status(500).json({ message: 'Database error deleting payment' });
  }
};



