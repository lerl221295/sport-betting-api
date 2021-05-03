const router = require('express-promise-router')();

router.get('/health', function (req, res, next) {
  res.json({ success: true });
});
router.use('/docs', require('./docs'));

router.use('/games', require('./games.routes'));
router.use('/bets', require('./bets.routes'));
router.use('/users', require('./users.routes'));

module.exports = router;
