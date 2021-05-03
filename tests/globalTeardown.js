const app = require('../src/app');
const knex = app.get('knex');
const redisClient = require('../src/redis');

module.exports = async () => {
  await knex.raw('DROP SCHEMA public CASCADE; CREATE SCHEMA public');
  await knex.destroy();
  await redisClient.quit();
};
