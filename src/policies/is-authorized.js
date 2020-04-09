const _ = require('lodash');

const { UnauthorizedError } = require('../errors');

module.exports = function isAuthorized(ctx) {
  const userId = _.get(ctx, 'user.id');
  if (!userId) {
    throw new UnauthorizedError();
  }
};
