const pool = require('../db');

// --------------------------
// KPI SUMMARY CARDS
// --------------------------
exports.getSummary = async (req, res) => {
  try {
    const revenueResult = await pool.query(`
      SELECT COALESCE(SUM(c.price * GREATEST((b.end_date - b.start_date)::int, 1)), 0) AS total_revenue
      FROM bookings b JOIN cars c ON b.car_id = c.id
      WHERE b.status != 'Cancelled'
    `);
    const bookingsResult = await pool.query(`SELECT COUNT(*) AS total_bookings FROM bookings WHERE status != 'Cancelled'`);
    const customersResult = await pool.query(`SELECT COUNT(*) AS total_customers FROM users`);
    const carsResult = await pool.query(`SELECT COUNT(*) AS total_cars FROM cars WHERE available = true`);

    res.json({
      totalRevenue: parseFloat(revenueResult.rows[0].total_revenue),
      totalBookings: parseInt(bookingsResult.rows[0].total_bookings, 10),
      totalCustomers: parseInt(customersResult.rows[0].total_customers, 10),
      availableCars: parseInt(carsResult.rows[0].total_cars, 10)
    });
  } catch (err) {
    console.error('🔥 Summary error:', err.message);
    res.status(500).json({ message: 'Error fetching summary' });
  }
};

// --------------------------
// REVENUE BY MONTH (last 6 months)
// --------------------------
exports.getRevenueByMonth = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        to_char(date_trunc('month', b.start_date), 'Mon YYYY') AS month,
        date_trunc('month', b.start_date) AS month_sort,
        SUM(c.price * GREATEST((b.end_date - b.start_date)::int, 1)) AS revenue
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      WHERE b.status != 'Cancelled'
        AND b.start_date >= (CURRENT_DATE - INTERVAL '6 months')
      GROUP BY date_trunc('month', b.start_date)
      ORDER BY month_sort ASC
    `);

    res.json(result.rows.map(r => ({
      month: r.month,
      revenue: parseFloat(r.revenue)
    })));
  } catch (err) {
    console.error('🔥 Revenue by month error:', err.message);
    res.status(500).json({ message: 'Error fetching revenue data' });
  }
};

// --------------------------
// POPULAR CARS (top 5 by booking count)
// --------------------------
exports.getPopularCars = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.carname, COUNT(*) AS bookings_count
      FROM bookings b
      JOIN cars c ON b.car_id = c.id
      WHERE b.status != 'Cancelled'
      GROUP BY c.carname
      ORDER BY bookings_count DESC
      LIMIT 5
    `);

    res.json(result.rows.map(r => ({
      carName: r.carname,
      bookings: parseInt(r.bookings_count, 10)
    })));
  } catch (err) {
    console.error('🔥 Popular cars error:', err.message);
    res.status(500).json({ message: 'Error fetching popular cars' });
  }
};

// --------------------------
// MONTHLY BOOKINGS (last 6 months)
// --------------------------
exports.getMonthlyBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        to_char(date_trunc('month', start_date), 'Mon YYYY') AS month,
        date_trunc('month', start_date) AS month_sort,
        COUNT(*) AS bookings_count
      FROM bookings
      WHERE status != 'Cancelled'
        AND start_date >= (CURRENT_DATE - INTERVAL '6 months')
      GROUP BY date_trunc('month', start_date)
      ORDER BY month_sort ASC
    `);

    res.json(result.rows.map(r => ({
      month: r.month,
      bookings: parseInt(r.bookings_count, 10)
    })));
  } catch (err) {
    console.error('🔥 Monthly bookings error:', err.message);
    res.status(500).json({ message: 'Error fetching monthly bookings' });
  }
};

// --------------------------
// CUSTOMER GROWTH (last 6 months, needs users.created_at)
// --------------------------
exports.getCustomerGrowth = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        to_char(date_trunc('month', created_at), 'Mon YYYY') AS month,
        date_trunc('month', created_at) AS month_sort,
        COUNT(*) AS new_customers
      FROM users
      WHERE created_at >= (CURRENT_DATE - INTERVAL '6 months')
      GROUP BY date_trunc('month', created_at)
      ORDER BY month_sort ASC
    `);

    res.json(result.rows.map(r => ({
      month: r.month,
      newCustomers: parseInt(r.new_customers, 10)
    })));
  } catch (err) {
    console.error('🔥 Customer growth error:', err.message);
    res.status(500).json({ message: 'Error fetching customer growth — does users.created_at exist?' });
  }
};