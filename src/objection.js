const { Model } = require('objection');
const knex = require('knex');
module.exports = function (app) {
  const knexConfig = {
    client: 'postgres',
    connection: process.env.db,
    useNullAsDefault: false,
    migrations: {
      tableName: 'knex_migrations',
    },
  };
  const db = knex(knexConfig);

  Model.knex(db);
  app.set('knex-config', knexConfig);
  app.set('knex', db);
};
