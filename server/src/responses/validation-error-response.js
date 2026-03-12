export class ValidationError extends Error {
  constructor(details) {
    super('Validation failed');
    this.code = 'VALIDATION_ERROR';
    this.httpStatus = 422;
    this.details = details;
    this.name = 'ValidationError';
  }
}

export const throwValidationError = (details) => {
  throw new ValidationError(details);
};
