const { Model } = require('objection');

class Games extends Model {
  static get tableName() {
    return 'games';
  }

  static get idColumn() {
    return 'gameId';
  }
}

module.exports = Games;
