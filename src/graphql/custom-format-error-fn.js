const { UnauthorizedError, ValidationError } = require('../errors');

const log = require('../log');

module.exports = function customFormatErrorFn(error) {
  const { message, locations, path, originalError } = error;

  let extensions = {};

  if (originalError instanceof UnauthorizedError || originalError instanceof ValidationError) {
    extensions = {
      ...extensions,
      errorName: originalError.name,
    };
    log.info(`${originalError.name} (${path}): ${originalError.message}`);
  } else {
    log.error(originalError || error);
  }

  if (originalError instanceof ValidationError) {
    extensions = {
      ...extensions,
      validationErrors: originalError.validationErrors,
    };
  }

  return {
    message,
    locations,
    path,
    extensions,
  };
};
