const log = require('../log');

module.exports = function createErrorHandler() {
  return function errorHandler(err, req, res, _) {
    log.error(err);
    res.status(500).end();
  };
};
