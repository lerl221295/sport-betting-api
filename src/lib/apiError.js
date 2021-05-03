class ApiError extends Error {
  constructor(
    message = 'Something broke!',
    httpStatusCode = 500,
    originalError,
    name = 'INTERNAL_ERROR',
  ) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.message = message;
    this.name = name;
    this.originalError = originalError;
    Error.captureStackTrace(this, ApiError);
  }
}

module.exports = ApiError;
