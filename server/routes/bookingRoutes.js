const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateToken, authorizeRoles, authorizeOwnerOrAdmin } = require('../middleware');
const pool = require('../db'); // DB connection

// --------------------------
// USER ROUTES
// --------------------------

// Get all bookings for logged-in user
router.get('/my-bookings', authenticateToken, bookingController.getUserBookings);

// Get current/active bookings for logged-in user
router.get('/my-bookings/current', authenticateToken, bookingController.getCurrentBookings);

// Get booking history for logged-in user
router.get('/my-bookings/history', authenticateToken, bookingController.getBookingHistory);

// Booking bill
// MUST be BEFORE the generic '/:id' route to prevent "invalid input syntax"
router.get('/bill/:bookingId', authenticateToken, bookingController.getBookingBill);

// Create a new booking (logged-in users)
router.post('/', authenticateToken, bookingController.createBooking);

// --------------------------
// ADMIN OR OWNER ROUTES
// --------------------------

// Update booking status (Confirm/Cancel) - only admin or booking owner
router.put(
  '/:id',
  authenticateToken,
  authorizeOwnerOrAdmin(async (req) => {
    const result = await pool.query('SELECT user_id FROM bookings WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) throw new Error('Booking not found');
    return result.rows[0].user_id;
  }),
  bookingController.updateBookingStatus
);

// Delete booking - only admin or booking owner
router.delete(
  '/:id',
  authenticateToken,
  authorizeOwnerOrAdmin(async (req) => {
    const result = await pool.query('SELECT user_id FROM bookings WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) throw new Error('Booking not found');
    return result.rows[0].user_id;
  }),
  bookingController.deleteBooking
);

// Get bookings by user (Admin only)
router.get('/user/:userId', authenticateToken, authorizeRoles(['admin']), bookingController.getBookingsByUser);

// --------------------------
// ADMIN ROUTES
// --------------------------

// Get all bookings (Admin only)
router.get('/', authenticateToken, authorizeRoles(['admin']), bookingController.getAllBookings);

// --------------------------
// COMMON ROUTE - SINGLE BOOKING
// --------------------------

// Get booking by ID (admin or owner)
// MUST be LAST to prevent conflicts with other routes like '/bill/:bookingId'
router.get('/:id', authenticateToken, bookingController.getBookingById);

module.exports = router;