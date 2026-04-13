const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { authenticateToken, authorizeRoles } = require('../middleware');

// Public routes (logged-in users)
router.get('/', authenticateToken, carController.getAllCars);
router.get('/:id', authenticateToken, carController.getCarById);

// Admin-only routes
router.post('/', authenticateToken, authorizeRoles(['Admin']), carController.createCar);
router.put('/:id', authenticateToken, authorizeRoles(['Admin']), carController.updateCar);
router.delete('/:id', authenticateToken, authorizeRoles(['Admin']), carController.deleteCar);


module.exports = router;