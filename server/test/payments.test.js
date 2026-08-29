process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttpModule = require('chai-http');
const chaiHttpPlugin = chaiHttpModule.default || chaiHttpModule;
chai.use(chaiHttpPlugin);
const { execute: request } = chaiHttpModule.request;

const app = require('../index');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { expect } = chai;

let userToken, adminToken, bookingId, paymentId;

const ADMIN_EMAIL = 'admin_payment@test.com';
const USER_EMAIL = 'user_payment@test.com';
const CAR_NAME = 'Payment Test Car';

// ⏸️ Skipped: payments is a future feature, not wired into the app yet.
// Table exists (real + test DB), controller/routes are ready.
// Change describe.skip back to describe when the feature goes live.
describe.skip('Payments API', function () {
  this.timeout(20000);

  before(async function () {
    try {
      await pool.query(
        `DELETE FROM payments WHERE booking_id IN (
           SELECT id FROM bookings WHERE user_id IN (
             SELECT id FROM users WHERE email IN ($1,$2)
           )
         )`,
        [ADMIN_EMAIL, USER_EMAIL]
      );
      await pool.query(
        `DELETE FROM bookings WHERE user_id IN (SELECT id FROM users WHERE email IN ($1,$2))`,
        [ADMIN_EMAIL, USER_EMAIL]
      );
      await pool.query(`DELETE FROM cars WHERE carname = $1`, [CAR_NAME]);
      await pool.query(`DELETE FROM users WHERE email IN ($1,$2)`, [ADMIN_EMAIL, USER_EMAIL]);

      const hashedAdmin = await bcrypt.hash('123456', 10);
      const adminRes = await pool.query(
        `INSERT INTO users (firstname, lastname, email, password, role)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        ['Test', 'Admin', ADMIN_EMAIL, hashedAdmin, 'Admin']
      );
      adminToken = jwt.sign(
        { id: adminRes.rows[0].id, role: 'Admin' },
        process.env.JWT_SECRET || 'demo_secret'
      );

      const hashedUser = await bcrypt.hash('123456', 10);
      const userRes = await pool.query(
        `INSERT INTO users (firstname, lastname, email, password, role)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        ['Test', 'User', USER_EMAIL, hashedUser, 'User']
      );
      userToken = jwt.sign(
        { id: userRes.rows[0].id, role: 'User' },
        process.env.JWT_SECRET || 'demo_secret'
      );

      const carRes = await pool.query(
        `INSERT INTO cars (carname, type, price)
         VALUES ($1,$2,$3) RETURNING *`,
        [CAR_NAME, 'Sedan', 100]
      );

      const bookingRes = await pool.query(
        `INSERT INTO bookings (user_id, car_id, start_date, end_date, status)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [userRes.rows[0].id, carRes.rows[0].id, '2026-05-01', '2026-05-03', 'Pending']
      );
      bookingId = bookingRes.rows[0].id;

    } catch (err) {
      console.error('PAYMENTS BEFORE ERROR:', err);
      throw err;
    }
  });

  it('should create a payment for user booking', async () => {
    const res = await request(app)
      .post('/api/payments')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ bookingId: bookingId, amount: 100, method: 'card', status: 'Paid' });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');
    paymentId = res.body.id;
  });

  it('should get all payments (admin)', async () => {
    const res = await request(app)
      .get('/api/payments')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should reject payment without JWT', async () => {
    const res = await request(app)
      .post('/api/payments')
      .send({ bookingId: bookingId, amount: 100, method: 'card' });

    expect(res).to.have.status(401);
  });

  after(async function () {
    try {
      await pool.query(`DELETE FROM payments WHERE booking_id = $1`, [bookingId]);
      await pool.query(`DELETE FROM bookings WHERE id = $1`, [bookingId]);
      await pool.query(`DELETE FROM cars WHERE carname = $1`, [CAR_NAME]);
      await pool.query(`DELETE FROM users WHERE email IN ($1,$2)`, [ADMIN_EMAIL, USER_EMAIL]);
    } catch (err) {
      console.error('PAYMENTS AFTER ERROR:', err);
    }
  });
});