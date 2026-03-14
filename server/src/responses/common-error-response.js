export class CommonError extends Error {
  constructor(code, message, httpStatus) {
    super(message);
    this.code = code;
    this.httpStatus = httpStatus;
    this.name = 'CommonError';
  }
}

export const COMMON_EROR_TYPES = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  FORBIDDEN: 'FORBIDDEN',
  CORS_ERROR: 'CORS_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
};

export const throwCommonError = (type) => {
  const ERRORS = {
    [COMMON_EROR_TYPES.BAD_REQUEST]: {
      code: COMMON_EROR_TYPES.BAD_REQUEST,
      message: 'The request was invalid or cannot be processed.',
      httpStatus: 400,
    },
    [COMMON_EROR_TYPES.UNAUTHORIZED]: {
      code: COMMON_EROR_TYPES.UNAUTHORIZED,
      message: 'Unauthorized access. Please provide valid credentials.',
      httpStatus: 401,
    },
    [COMMON_EROR_TYPES.TOKEN_EXPIRED]: {
      code: COMMON_EROR_TYPES.TOKEN_EXPIRED,
      message: 'Your session has expired. Please log in again.',
      httpStatus: 401,
    },
    [COMMON_EROR_TYPES.FORBIDDEN]: {
      code: COMMON_EROR_TYPES.FORBIDDEN,
      message: 'Forbidden access. You do not have permission to access this resource.',
      httpStatus: 403,
    },
    [COMMON_EROR_TYPES.CORS_ERROR]: {
      code: COMMON_EROR_TYPES.CORS_ERROR,
      message: 'Cross-Origin Resource Sharing (CORS) error.',
      httpStatus: 403,
    },
    [COMMON_EROR_TYPES.NOT_FOUND]: {
      code: COMMON_EROR_TYPES.NOT_FOUND,
      message: 'The requested resource was not found.',
      httpStatus: 404,
    },
    [COMMON_EROR_TYPES.INTERNAL_SERVER_ERROR]: {
      code: COMMON_EROR_TYPES.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred on the server.',
      httpStatus: 500,
    },
    [COMMON_EROR_TYPES.SERVICE_UNAVAILABLE]: {
      code: COMMON_EROR_TYPES.SERVICE_UNAVAILABLE,
      message: 'The service is currently unavailable. Please try again later.',
      httpStatus: 503,
    },
  };

  if (!ERRORS[type]) {
    throw new CommonError('UNKNOWN_ERROR', 'Unknown error type.', 500);
  }

  throw new CommonError(ERRORS[type].code, ERRORS[type].message, ERRORS[type].httpStatus);
};
