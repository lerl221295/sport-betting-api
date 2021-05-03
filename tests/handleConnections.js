const app = require('../src/app');
const redisClient = require('../src/redis');

afterAll(async () => {
  await redisClient.quit();
  await app.get('knex').destroy();
});
