const router = require('express-promise-router')();
const ApiError = require('../lib/apiError');
const Users = require('../models/users.model');

/**
 * @swagger
 *
 * /users/{id}/balance:
 *   get:
 *     description: Get
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User Id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/UserBalance'
 */
router.get('/:id/balance', async (req, res) => {
  const { id } = req.params;
  const user = await Users.query().findById(id).select('balance');
  if (!user) throw new ApiError('User not found', 404);
  return res.send({
    balance: user.balance,
  });
});

module.exports = router;
