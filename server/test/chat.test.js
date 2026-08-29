process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');

describe('Chat API', () => {

  it('should return greeting', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'hello' });

    expect(res.status).to.equal(200);
    expect(res.body.reply).to.include('Hello');
  });

  it('should handle empty message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({});

    expect(res.status).to.equal(400);
  });

});