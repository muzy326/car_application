process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttpModule = require('chai-http');
const chaiHttpPlugin = chaiHttpModule.default || chaiHttpModule;
chai.use(chaiHttpPlugin);
const { execute: request } = chaiHttpModule.request;

const app = require('../index');
const pool = require('../db');
const jwt = require('jsonwebtoken');

const { expect } = chai;

let testUser, testCar, userToken, bookingId;

const USER_EMAIL = 'booking_user@test.com';
const CAR_NAME = 'Booking Test Car';

describe('Bookings API', function () {
  this.timeout(30000);

  before(async function () {
    try {
      console.log('BOOKING BEFORE START');

      await pool.query(
        `DELETE FROM bookings WHERE user_id IN (SELECT id FROM users WHERE email = $1)`,
        [USER_EMAIL]
      );
      await pool.query(`DELETE FROM cars WHERE carname = $1`, [CAR_NAME]);
      await pool.query(`DELETE FROM users WHERE email = $1`, [USER_EMAIL]);

      console.log('CLEANUP DONE');

      const userRes = await pool.query(
        `INSERT INTO users (firstname, lastname, email, password, role)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        ['Test', 'User', USER_EMAIL, 'password', 'User']
      );
      testUser = userRes.rows[0];

      const carRes = await pool.query(
        `INSERT INTO cars (carname, type, price)
         VALUES ($1,$2,$3) RETURNING *`,
        [CAR_NAME, 'SUV', 100]
      );
      testCar = carRes.rows[0];

      userToken = jwt.sign(
        { id: testUser.id, role: testUser.role },
        process.env.JWT_SECRET || 'secretkey'
      );

      console.log('BOOKING BEFORE SUCCESS');

    } catch (err) {
      console.error('BOOKING BEFORE ERROR:', err);
      throw err;
    }
  });

  after(async function () {
    try {
      console.log('BOOKING AFTER START');

      await pool.query(
        `DELETE FROM bookings WHERE user_id IN (SELECT id FROM users WHERE email = $1)`,
        [USER_EMAIL]
      );
      await pool.query(`DELETE FROM cars WHERE carname = $1`, [CAR_NAME]);
      await pool.query(`DELETE FROM users WHERE email = $1`, [USER_EMAIL]);

      console.log('BOOKING AFTER DONE');

    } catch (err) {
      console.error('BOOKING AFTER ERROR:', err);
    }
  });

  it('should create a new booking', async function () {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        car_id: testCar.id,
        start_date: '2026-04-10',
        end_date: '2026-04-12'
      });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id');

    bookingId = res.body.id;
  });

  it('should get current bookings', async function () {
    const res = await request(app)
      .get('/api/bookings/my-bookings/current')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should get booking history', async function () {
    const res = await request(app)
      .get('/api/bookings/my-bookings/history')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  it('should update booking status', async function () {
    const res = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ status: 'Confirmed' });

    expect(res).to.have.status(200);
    expect(res.body.status).to.equal('Confirmed');
  });

  it('should delete booking', async function () {
    const res = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res).to.have.status(200);
    expect(res.body.message).to.include('deleted');
  });

});