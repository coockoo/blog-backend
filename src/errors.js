class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ForbiddenError extends ExtendableError {
  constructor(message) {
    super(message || 'Forbidden');
  }
}

class NotFoundError extends ExtendableError {
  constructor(message) {
    super(message || 'Not Found');
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

module.exports = {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
};
