const { Model } = require('objection');

class Users extends Model {
  static get tableName() {
    return 'bets';
  }

  static get idColumn() {
    return 'betId';
  }

  static get relationMappings() {
    const Users = require('./users.model'); // eslint-disable-line global-require
    const Games = require('./games.model'); // eslint-disable-line global-require

    return {
      userA: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'bets.userAId',
          to: 'users.userId',
        },
      },
      userB: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'bets.userBId',
          to: 'users.userId',
        },
      },
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Games,
        join: {
          from: 'bets.gameId',
          to: 'games.gameId',
        },
      },
    };
  }
}

module.exports = Users;
