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

module.exports = {
  UnauthorizedError,
  ValidationError,
};
