class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class UnauthorizedError extends ExtendableError {
  constructor(message) {
    super(message || 'Unauthorized');
  }
}

class ValidationError extends ExtendableError {
  constructor(validationErrors, message) {
    super(message || 'Validation errors');
    this.validationErrors = validationErrors;
  }
}

class NotFoundError extends ExtendableError {
  constructor(validationErrors, message) {
    super(message || 'Not Found');
  }
}

module.exports = {
  UnauthorizedError,
  ValidationError,
  NotFoundError,
};
