const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateToken, authorizeRoles } = require('../middleware');

router.get('/summary', authenticateToken, authorizeRoles(['admin']), analyticsController.getSummary);
router.get('/revenue-by-month', authenticateToken, authorizeRoles(['admin']), analyticsController.getRevenueByMonth);
router.get('/popular-cars', authenticateToken, authorizeRoles(['admin']), analyticsController.getPopularCars);
router.get('/monthly-bookings', authenticateToken, authorizeRoles(['admin']), analyticsController.getMonthlyBookings);
router.get('/customer-growth', authenticateToken, authorizeRoles(['admin']), analyticsController.getCustomerGrowth);

module.exports = router;