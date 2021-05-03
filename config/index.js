/*

Root config file

 */
const merge = require('lodash/merge');
const cloneDeep = require('lodash/cloneDeep');

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV must be set');
}

let env;

switch (process.env.NODE_ENV) {
  case 'local':
    env = require('./local.env');
    break;
  case 'development':
    env = require('./dev.env');
    break;
  case 'stage':
    env = require('./stage.env');
    break;
  case 'production':
    env = require('./prod.env');
    break;
  default:
    throw new Error(`unknown NODE_ENV "${process.env.NODE_ENV}"`);
}

const originalProcessEnv = cloneDeep(process.env);

merge(process.env, env, originalProcessEnv); // set process.env now so envKey can read the environment key ensuring that the environment variables override config variables

merge(process.env, env, originalProcessEnv);

module.exports = env;
