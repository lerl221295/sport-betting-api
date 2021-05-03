const router = require('express-promise-router')();
const Games = require('../models/games.model');

/**
 * @swagger
 *
 * /games:
 *   get:
 *     description: Get
 *     tags:
 *       - Games
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/GamesList'
 */
router.get('/', async (req, res) => {
  const games = await Games.query().orderBy('startDateTime');
  return res.send(games);
});

module.exports = router;
