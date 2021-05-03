exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (table) => {
      table.string('userId').primary();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('username').notNullable();
      table.float('balance').defaultTo(0);
    })
    .then(() => console.log('Created users table'));
  await knex.schema
    .createTable('games', (table) => {
      table.bigInteger('gameId').primary();
      table.bigInteger('homeTeamId').notNullable();
      table.bigInteger('awayTeamId').notNullable();
      table.timestamp('startDateTime').notNullable();
      table.string('sport').notNullable();

      //football attrs
      table.string('playingSurface');
      table.bigInteger('capacity');
      table.bigInteger('windSpeed');
      table.bigInteger('windChill');
      table.string('channel');

      //basketball attrs
      table.bigInteger('homeRotationNumber');
      table.bigInteger('awayRotationNumber');
      table.json('quarters');

      //baseball attrs
      table.json('innings');
      table.string('currentHitter');
      table.string('currentPitcher');
      table.string('inningDescription');
      table.integer('outs');
      table.integer('balls');
      table.integer('strikes');
    })
    .then(() => console.log('Created pages table'));
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users').then(() => console.log('Dropped users table'));
  await knex.schema.dropTable('games').then(() => console.log('Dropped games table'));
};
