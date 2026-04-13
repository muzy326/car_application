// middleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Authenticate JWT token
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) return res.status(401).json({ message: 'Unauthorized. Please login again.' });

  jwt.verify(token, process.env.JWT_SECRET || 'demo_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // user = { id: 1, role: 'user' }
    next();
  });
}

/**
 * Authorize roles
 * roles = ['admin'], etc.
 */
function authorizeRoles(roles = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    if (
  roles.length > 0 &&
  !roles.map(role => role.toLowerCase()).includes(req.user.role.toLowerCase())
) {
  return res.status(403).json({ message: 'Forbidden: Access denied' });
}

    next();
  };
}

/**
 * Authorize Admin OR Resource Owner
 * Usage: pass a function that returns owner ID from req.params or req.body
 */
function authorizeOwnerOrAdmin(getOwnerId) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const ownerId = await getOwnerId(req); // e.g., booking.user_id
      if (req.user.role.toLowerCase() !== 'admin' && req.user.id !== ownerId) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
}

module.exports = { authenticateToken, authorizeRoles, authorizeOwnerOrAdmin };