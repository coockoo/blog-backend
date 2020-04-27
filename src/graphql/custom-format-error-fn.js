const { ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } = require('../errors');

const log = require('../log');

module.exports = function customFormatErrorFn(graphQLError) {
  const { locations, path, originalError: error } = graphQLError;

  if (!error) {
    return graphQLError;
  }

  let { message } = graphQLError;
  let extensions = {};

  if (
    error instanceof ForbiddenError ||
    error instanceof NotFoundError ||
    error instanceof UnauthorizedError ||
    error instanceof ValidationError
  ) {
    extensions = {
      ...extensions,
      errorName: error.name,
    };
    log.info(`${error.name} (${path}): ${error.message}`);
  } else {
    message = 'Internal server error';
    extensions = {
      ...extensions,
      errorName: 'InternalServerError',
    };
    log.error(error);
  }

  if (error instanceof ValidationError) {
    extensions = {
      ...extensions,
      validationErrors: error.validationErrors,
    };
  }

  return {
    message,
    locations,
    path,
    extensions,
  };
};
