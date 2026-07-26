


const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  registerUser, 
  loginUser, 
  getProfile, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware');

// Public routes
router.post('/register', registerUser);   // Register new user
router.post('/login', loginUser);             // Login

// Protected route (any logged-in user)
router.get('/profile', authenticateToken, getProfile);  // Get own profile

// Admin-only routes
router.get('/', authenticateToken, authorizeRoles(['Admin']), getAllUsers);       // Get all users
router.get('/:id', authenticateToken, authorizeRoles(['Admin']), getUserById);    // Get user by ID
router.post('/', authenticateToken, authorizeRoles(['Admin']), registerUser);     // Add new user
router.put('/:id', authenticateToken, authorizeRoles(['Admin']), updateUser);     // Update user
router.delete('/:id', authenticateToken, authorizeRoles(['Admin']), deleteUser);  // Delete user

module.exports = router;
