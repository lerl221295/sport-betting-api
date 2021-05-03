const request = require('supertest');
const app = require('../src/app');
let agent;
const Users = require('../src/models/users.model');
const Games = require('../src/models/games.model');
let user1, user2, game1, game2;
beforeAll(async () => {
  agent = request(app);
});

describe('Bets', () => {
  it('should get list ordered by created time', async () => {
    const { body, statusCode } = await agent.get('/bets');
    expect(statusCode).toBe(200);
    body.forEach((game, i) => {
      expect(game.gameId).toBeTruthy();
      expect(game.createdAt).toBeTruthy();
      if (i > 0) {
        expect(new Date(game.createdAt).getTime()).toBeGreaterThan(
          new Date(body[i - 1].createdAt).getTime(),
        );
      }
    });
  });

  describe('Creating bets', () => {
    beforeAll(async () => {
      user1 = await Users.query().insert({
        userId: 'test-user-id-1',
        firstName: 'Joe',
        lastName: 'Due',
        username: 'joe-due',
        balance: 1000,
      });

      user2 = await Users.query().insert({
        userId: 'test-user-id-2',
        firstName: 'Jon',
        lastName: 'Due',
        username: 'jon-due',
        balance: 1000,
      });

      [game1, game2] = await Games.query().limit(2);
    });

    it('should fail with an invalid payload', async () => {
      const { statusCode } = await agent.post('/bets');
      expect(statusCode).toBe(400);
    });

    it('should fail if balance is not enough to make the bet', async () => {
      const { body, statusCode } = await agent.post('/bets').send({
        userId: user1.userId,
        gameId: game1.gameId,
        teamId: game1.homeTeamId,
        amount: 200000,
      });
      expect(statusCode).toBe(400);
      expect(body.message).toBe('Insufficient balance');
    });

    it('should successfully create a bet', async () => {
      const { body, statusCode } = await agent.post('/bets').send({
        userId: user1.userId,
        gameId: game1.gameId,
        teamId: game1.homeTeamId,
        amount: 500,
      });
      expect(statusCode).toBe(200);
      expect(body.betId).toBeTruthy();
    });

    it('should successfully create a bet matching it with an existing one', async () => {
      const { body: firstBet } = await agent.post('/bets').send({
        userId: user2.userId,
        gameId: game2.gameId,
        teamId: game2.homeTeamId,
        amount: 500,
      });

      const { body: matchedBet } = await agent.post('/bets').send({
        userId: user1.userId,
        gameId: game2.gameId,
        teamId: game2.awayTeamId,
        amount: 500,
      });

      expect(firstBet.betId).toBe(matchedBet.betId);
    });

    it('should not match 2 bets of the same user', async () => {
      const { body: firstBet } = await agent.post('/bets').send({
        userId: user2.userId,
        gameId: game2.gameId,
        teamId: game2.homeTeamId,
        amount: 200,
      });

      const { body: matchedBet } = await agent.post('/bets').send({
        userId: user2.userId,
        gameId: game2.gameId,
        teamId: game2.awayTeamId,
        amount: 200,
      });

      expect(firstBet.betId).not.toBe(matchedBet.betId);
    });

    it('should not match 2 bets with different amounts', async () => {
      const { body: firstBet } = await agent.post('/bets').send({
        userId: user2.userId,
        gameId: game2.gameId,
        teamId: game2.homeTeamId,
        amount: 10,
      });

      const { body: matchedBet } = await agent.post('/bets').send({
        userId: user2.userId,
        gameId: game2.gameId,
        teamId: game2.awayTeamId,
        amount: 20,
      });

      expect(firstBet.betId).not.toBe(matchedBet.betId);
    });
  });
});
