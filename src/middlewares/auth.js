const log = require('../log');

const { verifyJWT } = require('../services/jwt');

module.exports = function createAuthMiddleware() {
  return async function authMiddleware(req, res, next) {
    let user = null;

    const authorizationHeader = req.get('Authorization') || '';
    const token = authorizationHeader.replace('Bearer ', '');

    if (token) {
      try {
        const payload = await verifyJWT(token);
        user = { id: payload.sub }; // TODO Add checks and other stuff
      } catch (error) {
        log.warn(`cannot get user from JWT: ${error.message}`);
      }
    }

    req.user = user;

    next();
  };
};
