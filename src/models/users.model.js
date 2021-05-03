const { Model } = require('objection');

class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'userId';
  }
}

module.exports = Users;
