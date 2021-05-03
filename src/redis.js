const Redis = require('ioredis');
const { redis_host, redis_db } = require('../config');
const { isTestEnv } = require('./lib/utils/testEnv');

module.exports = new Redis({
  host: redis_host,
  db: redis_db,
  connectTimeout: 1000,
  commandTimeout: 100,
  retryStrategy(times) {
    return times <= 2 ? 100 : false;
  },
  enableOfflineQueue: isTestEnv(),
});
