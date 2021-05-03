const app = require('../src/app');
const knex = app.get('knex');
const path = require('path');

const migrations = path.resolve(__dirname, '../migrations');
const seeds = path.resolve(__dirname, '../seeds');

module.exports = async () => {
  await knex.raw('DROP SCHEMA public CASCADE; CREATE SCHEMA public');
  await knex.migrate.latest({ directory: migrations });
  await knex.seed.run({ directory: seeds });
};
