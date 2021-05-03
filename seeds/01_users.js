const axios = require('axios');
exports.seed = async function (knex) {
  const { data: users } = await axios.get(
    'https://us-central1-wagr-develop.cloudfunctions.net/code-challenge-users-data',
  );
  return knex('users').insert(users);
};
