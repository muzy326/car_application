

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const pool = require('../db');

const pool = require('../db');

// ---------------- GET ALL USERS ----------------
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, firstname, lastname, email, role FROM users'
    );
    res.json(result.rows);
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- GET PROFILE ----------------
exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const result = await pool.query(
      'SELECT id, firstname, lastname, email, role, phonenumber FROM users WHERE id=$1',
      [req.user.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- GET USER BY ID ----------------
exports.getUserById = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, firstname, lastname, email, role, phonenumber FROM users WHERE id=$1',
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- REGISTER ----------------
exports.registerUser = async (req, res) => {
  const { firstname, lastname, email, password, role, phonenumber } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const existing = await pool.query(
      'SELECT * FROM users WHERE LOWER(email)=LOWER($1)',
      [email]
    );

    if (existing.rows.length) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users 
      (firstname, lastname, email, password, role, phonenumber) 
      VALUES ($1,$2,$3,$4,$5,$6) 
      RETURNING id, firstname, lastname, email, role, phonenumber`,
      [firstname, lastname, email, hashedPassword, role || 'User', phonenumber || null]
    );

    res.status(201).json({
      message: 'User created',
      user: result.rows[0]
    });

  // } catch (err) {
  //   console.error("registerUser error:", err);
  //   res.status(500).json({ message: 'Server error' });
  // }
  } catch (err) {
  console.error("🔥 FULL ERROR:", err);

  return res.status(500).json({
    message: err.message,
    code: err.code,
    detail: err.detail,
    hint: err.hint
  });
}
};

// ---------------- UPDATE ----------------
exports.updateUser = async (req, res) => {
  const { firstname, lastname, email, password, role, phonenumber } = req.body;

  try {
    let result;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);

      result = await pool.query(
        `UPDATE users 
         SET firstname=$1, lastname=$2, email=$3, password=$4, role=$5, phonenumber=$6 
         WHERE id=$7 RETURNING *`,
        [firstname, lastname, email, hashed, role || 'User', phonenumber || null, req.params.id]
      );
    } else {
      result = await pool.query(
        `UPDATE users 
         SET firstname=$1, lastname=$2, email=$3, role=$4, phonenumber=$5 
         WHERE id=$6 RETURNING *`,
        [firstname, lastname, email, role || 'User', phonenumber || null, req.params.id]
      );
    }

    if (!result.rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated', user: result.rows[0] });

  } catch (err) {
    console.error("updateUser error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- DELETE ----------------
exports.deleteUser = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id=$1 RETURNING *',
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted', user: result.rows[0] });

  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- LOGIN (FIXED 🔥) ----------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔥 DEBUG: check DB contents inside API
    const allUsers = await pool.query('SELECT email FROM users');
    console.log("USERS INSIDE LOGIN:", allUsers.rows);

    const result = await pool.query(
      'SELECT * FROM users WHERE LOWER(email)=LOWER($1)',
      [email]
    );

    console.log("LOGIN EMAIL:", email);
    console.log("FOUND USER:", result.rows);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { id: user.id, firstname: user.firstname, role: user.role },
      process.env.JWT_SECRET || 'demo_secret',
      { expiresIn: '8h' }
    );

    res.status(200).json({ token });

  // } catch (err) {
  //   console.error("loginUser error:", err);
  //   res.status(500).json({ message: 'Server error' });
  // }
  } catch (err) {
  console.error("🔥 LOGIN FULL ERROR:", err);

  return res.status(500).json({
    message: err.message,
    code: err.code,
    detail: err.detail,
    stack: err.stack
  });
}
};