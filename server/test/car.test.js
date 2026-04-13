

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
const { expect } = chai;

let adminToken, userToken, carId;

const ADMIN_EMAIL = 'admin_car@test.com';
const USER_EMAIL = 'user_car@test.com';

describe('Cars API', function () {
  this.timeout(20000);

  before(async function () {
    try {
      // cleanup
      await pool.query(`DELETE FROM bookings`);
      await pool.query(`DELETE FROM cars`);
      await pool.query(`DELETE FROM users WHERE email IN ($1,$2)`, [ADMIN_EMAIL, USER_EMAIL]);

      // create admin
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

      // create user
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

    } catch (err) {
      console.error('BEFORE ERROR:', err);
      throw err;
    }
  });

  it('should create a car (admin)', async () => {
    const res = await chai.request(app)
      .post('/api/cars')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ carname: 'Test Car', price: 100 });

    expect(res).to.have.status(201);
    carId = res.body.car.id;
  });

  it('should get all cars', async () => {
    const res = await chai.request(app)
      .get('/api/cars')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res).to.have.status(200);
  });

  it('should update a car', async () => {
    const res = await chai.request(app)
      .put(`/api/cars/${carId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ carname: 'Updated Car', price: 120 });

    expect(res).to.have.status(200);
  });

  it('should delete a car', async () => {
    const res = await chai.request(app)
      .delete(`/api/cars/${carId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res).to.have.status(200);
  });

  after(async function () {
    await pool.query(`DELETE FROM bookings`);
    await pool.query(`DELETE FROM cars`);
    await pool.query(`DELETE FROM users WHERE email IN ($1,$2)`, [ADMIN_EMAIL, USER_EMAIL]);
  });
});