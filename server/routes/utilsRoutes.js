const express = require('express');
const router = express.Router();
const pool = require('../db'); // make sure you export your Pool from a db.js file

// Example route
router.get('/ping', (req, res) => {
  res.json({ message: 'Utils route is working!' });
});


// -------------------- TEST ROUTES --------------------
router.get('/', (req, res) => res.send('Server is running'));

router.get('/testdb', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database Error');
  }
});

module.exports = router;