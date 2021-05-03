const request = require('supertest');
const app = require('../src/app');
let agent;

beforeAll(async () => {
  agent = request(app);
});

describe('Games', () => {
  it('should get list ordered by game start time', async () => {
    const { body, statusCode } = await agent.get('/games');
    expect(statusCode).toBe(200);
    body.forEach((game, i) => {
      expect(game.gameId).toBeTruthy();
      expect(game.startDateTime).toBeTruthy();
      if (i > 0) {
        expect(new Date(game.startDateTime).getTime()).toBeGreaterThan(
          new Date(body[i - 1].startDateTime).getTime(),
        );
      }
    });
  });
});
