const knex = require('knex');
const _ = require('lodash');
const { types } = require('pg');

const config = require('../../config');

function parseTimestamp(value) {
  return value === null ? null : new Date(value).toISOString();
}
types.setTypeParser(types.builtins.TIMESTAMPTZ, parseTimestamp);

module.exports = knex({
  ...config.knex,
  wrapIdentifier,
  postProcessResponse,
});

function wrapIdentifier(value, originalImpl) {
  if (value === '*') {
    return originalImpl(value);
  }
  return originalImpl(_.snakeCase(value));
}

function postProcessResponse(response) {
  if (!response) {
    return response;
  }
  if (Array.isArray(response)) {
    return _.map(response, rowToCamelCase);
  }
  return rowToCamelCase(response);
}

function rowToCamelCase(row) {
  const keys = Object.keys(row);
  return _.reduce(
    keys,
    (res, key) => {
      const camelCaseKey = _.camelCase(key);
      res[camelCaseKey] = row[key];
      return res;
    },
    {}
  );
}
