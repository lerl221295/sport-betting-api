const app = require('./src/app');
module.exports = {
  [process.env.NODE_ENV]: app.get('knex-config'),
};
