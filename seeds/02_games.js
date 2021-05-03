const axios = require('axios');
exports.seed = async function (knex) {
  const { data: games } = await axios.get(
    'https://us-central1-wagr-develop.cloudfunctions.net/code-challenge-games-data',
  );
  return knex('games').insert(
    games.map(({ innings, quarters, ...game }) => ({
      ...game,
      innings: innings ? JSON.stringify(innings) : null,
      quarters: quarters ? JSON.stringify(quarters) : null,
    })),
  );
};
