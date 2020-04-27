const _ = require('lodash');
const onFinished = require('on-finished');

function hideSensitiveData(str) {
  return str.replace(/("?(?:token|password)"?\s*):(\s*")[^"]+(")/g, '$1:$2******$3');
}

// TODO: hide large bodies from the logging, as they clutter a lot
module.exports = function createRequestLogger(logFn = () => {}) {
  return function requestLogger(req, res, next) {
    req.__startTime = Date.now();

    const handleFinished = () => {
      const now = Date.now();
      const duration = now - req.__startTime;
      const isGraphQL = req.originalUrl === '/graphql' && req.method === 'POST';

      const { user } = req;
      const userId = _.get(user, 'id');
      const userInfo = `user:${userId || 'no-user'}`;

      const baseInfo = `${duration}ms ${res.statusCode} ${userInfo}`;
      if (isGraphQL) {
        const { body } = req;
        const query = body.query || '';
        const variables = body.variables || {};

        let q = query
          .replace(/__typename/, '')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        q = hideSensitiveData(q);

        let v = JSON.stringify(variables);
        v = hideSensitiveData(v);

        logFn(`[gql] ${baseInfo} ${q} ${v}`);
      } else {
        logFn(`[req] ${baseInfo} ${req.method} ${req.originalUrl}`);
      }
    };

    onFinished(res, handleFinished);

    next();
  };
};
