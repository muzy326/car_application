const db = require('../db');
const bcrypt = require('bcryptjs'); // <- added for password hashing

// Create new user (hash password before saving)
const createUser = async (user) => {
  const { firstname, lastname, email, password, role } = user;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (firstname, lastname, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, firstname, lastname, email, role;
  `;

  const values = [firstname, lastname, email, hashedPassword, role || 'user'];

  const result = await db.query(query, values);
  return result.rows[0];
};

// Get all users (don't return passwords)
const getAllUsers = async () => {
  const result = await db.query('SELECT id, firstname, lastname, email, role FROM users');
  return result.rows;
};

// Get user by email (needed for login)
const getUserByEmail = async (email) => {
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

// Get user by ID (don't return password)
const getUserById = async (id) => {
  const result = await db.query(
    'SELECT id, firstname, lastname, email, role FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById
};
