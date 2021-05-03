const router = require('express-promise-router')();
const Joi = require('joi');
const ApiError = require('../lib/apiError');
const Users = require('../models/users.model');
const Bets = require('../models/bets.model');
const Games = require('../models/games.model');
const Redlock = require('redlock');
const redisClient = require('../redis');

/**
 * @swagger
 *
 * /bets:
 *   post:
 *     description: Create bet, match automatically if possible
 *     tags:
 *       - Bets
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/definitions/CreateBet'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Bet'
 */
const createBetSchema = Joi.object({
  userId: Joi.string().required(),
  gameId: Joi.number().integer().required(),
  teamId: Joi.number().integer().required(),
  amount: Joi.number().required(),
});

const redlock = new Redlock([redisClient]);
redlock.on('clientError', function (err) {
  console.error('A redis error has occurred:', err);
});

router.post('/', async (req, res) => {
  const { userId, gameId, teamId, amount } = await createBetSchema.validateAsync(req.body);

  // note that this logic bellow could be placed in a service as another software component
  const user = await Users.query().findById(userId);
  if (!user) throw new ApiError('User not found', 404);
  if (user.balance < amount) throw new ApiError('Insufficient balance', 400);

  const game = await Games.query()
    .where({ gameId })
    .andWhere((q) => {
      q.where('homeTeamId', teamId).orWhere('awayTeamId', teamId);
    })
    .first();
  if (!game) throw new ApiError('Game not found', 404);

  /* ensure that we match bets consistently: locking the resource so if someone tries to bet for the same game, 
  team and amount, we prevent a race condition by waiting for the first one to finish its transaction */
  const lock = await redlock.lock(`bet:${gameId}:${teamId}:${amount}`, 1000);
  const possibleMatchingBet = await Bets.query()
    .where({
      amount,
      gameId,
    })
    .andWhere('userATeam', '<>', teamId)
    .andWhere('userAId', '<>', userId)
    .andWhere((q) => q.whereNull('userBId'))
    .orderBy('createdAt') // so it gets the oldest bet created
    .first();

  const bet = await Bets.transaction(async (trx) => {
    await user.$query(trx).patch({
      balance: user.balance - amount,
    });
    if (possibleMatchingBet) {
      await possibleMatchingBet.$query(trx).patch({
        userBId: userId,
        userBTeam: teamId,
      });
      return possibleMatchingBet;
    }
    return Bets.query(trx).insert({
      gameId,
      amount,
      userAId: userId,
      userATeam: teamId,
    });
  });
  await lock.unlock();

  return res.send(bet);
});

/**
 * @swagger
 *
 * /bets:
 *   get:
 *     description: Get
 *     tags:
 *       - Bets
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/BetsList'
 */
router.get('/', async (req, res) => {
  const bets = await Bets.query().orderBy('createdAt');
  return res.send(bets);
});

module.exports = router;
