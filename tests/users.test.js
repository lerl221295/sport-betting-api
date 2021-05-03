const request = require('supertest');
const app = require('../src/app');
let agent;
const Users = require('../src/models/users.model');
let user;
beforeAll(async () => {
  agent = request(app);
});

describe('Users', () => {
  beforeAll(async () => {
    user = await Users.query().insert({
      userId: 'test-user-id',
      firstName: 'Joe',
      lastName: 'Due',
      username: 'joe-due',
      balance: 1000,
    });
  });

  it('should get users balance', async () => {
    const { body, statusCode } = await agent.get(`/users/${user.userId}/balance`);
    expect(statusCode).toBe(200);
    expect(body.balance).toBe(1000);
  });
});
