export class CommonError extends Error {
  constructor(code, message, httpStatus) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
    this.name = 'CommonError';
  }
}

export const throwCommonError = (type) => {
  const ERRORS = {
    BAD_REQUEST: {
      code: 'BAD_REQUEST',
      message: 'The request was invalid or cannot be processed.',
      httpStatus: 400,
    },
    UNAUTHORIZED: {
      code: 'UNAUTHORIZED',
      message: 'Unauthorized access. Please provide valid credentials.',
      httpStatus: 401,
    },
    TOKEN_EXPIRED: {
      code: 'TOKEN_EXPIRED',
      message: 'Your session has expired. Please log in again.',
      httpStatus: 401,
    },
    FORBIDDEN: {
      code: 'FORBIDDEN',
      message:
        'Forbidden access. You do not have permission to access this resource.',
      httpStatus: 403,
    },
    CORS_ERROR: {
      code: 'CORS_ERROR',
      message: 'Cross-Origin Resource Sharing (CORS) error.',
      httpStatus: 403,
    },
    NOT_FOUND: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found.',
      httpStatus: 404,
    },
    INTERNAL_SERVER_ERROR: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred on the server.',
      httpStatus: 500,
    },
    SERVICE_UNAVAILABLE: {
      code: 'SERVICE_UNAVAILABLE',
      message: 'The service is currently unavailable. Please try again later.',
      httpStatus: 503,
    },
  };

  if (!ERRORS[type]) {
    throw new CommonError('UNKNOWN_ERROR', 'Unknown error type.', 500);
  }

  throw new CommonError(
    ERRORS[type].code,
    ERRORS[type].message,
    ERRORS[type].httpStatus
  );
};
