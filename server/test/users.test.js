process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttpModule = require('chai-http');
const chaiHttpPlugin = chaiHttpModule.default || chaiHttpModule;
chai.use(chaiHttpPlugin);
const { execute: request } = chaiHttpModule.request;

const app = require('../index');
const pool = require('../db');
const bcrypt = require('bcryptjs');

const { expect } = chai;

let adminToken;
let userToken;

const ADMIN_EMAIL = 'admin_user@test.com';
const USER_EMAIL = 'user_user@test.com';

describe('User API', function () {
  this.timeout(20000);

  before(async function () {
    try {
      console.log('USER TEST BEFORE START');

      await pool.query(`DELETE FROM users WHERE email IN ($1,$2)`, [
        ADMIN_EMAIL,
        USER_EMAIL
      ]);

      const hashedAdmin = await bcrypt.hash('123456', 10);
      await pool.query(
        `INSERT INTO users (firstname, lastname, email, password, role)
         VALUES ($1,$2,$3,$4,$5)`,
        ['Test', 'Admin', ADMIN_EMAIL, hashedAdmin, 'Admin']
      );

      const hashedUser = await bcrypt.hash('user123', 10);
      await pool.query(
        `INSERT INTO users (firstname, lastname, email, password, role)
         VALUES ($1,$2,$3,$4,$5)`,
        ['Test', 'User', USER_EMAIL, hashedUser, 'User']
      );

      const check = await pool.query(
        'SELECT email, role FROM users WHERE email IN ($1,$2)',
        [ADMIN_EMAIL, USER_EMAIL]
      );

      console.log('USERS CREATED:', check.rows);

    } catch (err) {
      console.error('USER BEFORE ERROR:', err);
      throw err;
    }
  });

  it('should login admin', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: ADMIN_EMAIL, password: '123456' });

    console.log('ADMIN LOGIN RESPONSE:', res.body);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');

    adminToken = res.body.token;
  });

  it('should login user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: USER_EMAIL, password: 'user123' });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');

    userToken = res.body.token;
  });

  it('should get admin profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res).to.have.status(200);
    expect(res.body.email).to.equal(ADMIN_EMAIL);
    expect(res.body.role).to.equal('Admin');
  });

  it('should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res).to.have.status(200);
    expect(res.body.email).to.equal(USER_EMAIL);
    expect(res.body.role).to.equal('User');
  });

  after(async function () {
    try {
      console.log('USER TEST CLEANUP');

      await pool.query(`DELETE FROM users WHERE email IN ($1,$2)`, [
        ADMIN_EMAIL,
        USER_EMAIL
      ]);

    } catch (err) {
      console.error('USER AFTER ERROR:', err);
    }
  });
});