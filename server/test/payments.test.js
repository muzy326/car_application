// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../index'); // Your express app
// const pool = require('../db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// chai.use(chaiHttp);

// const { expect } = chai;



// // test/payments.test.js
// const request = require('supertest');
// const { expect } = require('chai');
// const app = require('../index');
// const { userToken, adminToken } = require('./users.test');

// let paymentId;

// describe('Payments API', () => {

//   it('should create a payment for user booking', async () => {
//     const res = await request(app)
//       .post('/api/payments')
//       .set('Authorization', `Bearer ${userToken}`)
//       .send({ booking_id: 1, amount: 100, method: 'card' });

//     expect(res.status).to.equal(201);
//     expect(res.body).to.have.property('id');
//     paymentId = res.body.id;
//   });

//   it('should get all payments (admin)', async () => {
//     const res = await request(app)
//       .get('/api/payments')
//       .set('Authorization', `Bearer ${adminToken}`);

//     expect(res.status).to.equal(200);
//     expect(res.body).to.be.an('array');
//   });

//   it('should reject payment without JWT', async () => {
//     const res = await request(app)
//       .post('/api/payments')
//       .send({ booking_id: 1, amount: 100, method: 'card' });

//     expect(res.status).to.equal(401);
//   });

// });