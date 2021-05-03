exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema
    .createTable('bets', (table) => {
      table.uuid('betId').defaultTo(knex.raw('uuid_generate_v4()')).primary();
      table.integer('gameId').references('gameId').inTable('games').notNullable();
      table.string('userAId').references('userId').inTable('users').notNullable();
      table.integer('userATeam').notNullable();
      table.float('amount').notNullable();
      table.string('userBId').references('userId').inTable('users');
      table.integer('userBTeam');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    .then(() => console.log('Created bets table'));
};

exports.down = async (knex) => {
  await knex.schema.dropTable('bets').then(() => console.log('Dropped bets table'));
  await knex.raw('drop extension if exists "uuid-ossp"');
};
