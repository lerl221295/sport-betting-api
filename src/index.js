/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const { port, host = 'localhost' } = require('../config');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason),
);

server.on('listening', () => {
  logger.info('API listening on http://%s:%d', host, port);
});
