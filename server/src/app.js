const path = require('path');

const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');

const { throwCommonError, CommonError, COMMON_EROR_TYPES } = require('./responses/common-error-response');
const { ValidationError } = require('./responses/validation-error-response');
const v1IndexRouter = require('./router/v1-index-router');
const v1PublicRouter = require('./router/v1-public-router');
const v1UsersRouter = require('./router/v1-users-router');
const { requestHandler, errorResponse, errorResponseWithDetails } = require('./utils/express-utils');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// global middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files setup
app.use(express.static(path.join(__dirname, '../public')));

// route setup
app.use('/api/v1', v1IndexRouter);
app.use('/api/v1/public', v1PublicRouter);
app.use('/api/v1/users', v1UsersRouter);

// catch 404 and forward to error handler
app.use(
  requestHandler(() => {
    throwCommonError(COMMON_EROR_TYPES.NOT_FOUND);
  })
);

// error handler
app.use((err, _req, res, _next) => {
  if (err instanceof CommonError) {
    const error = errorResponse(err.message, err.code);
    res.status(err.httpStatus).json(error);
  } else if (err instanceof ValidationError) {
    const error = errorResponseWithDetails(err.details, err.message, err.code);
    res.status(err.httpStatus).json(error);
  } else {
    const error = errorResponse('An unexpected error occurred on the server.');
    res.status(500).json(error);
  }
});

module.exports = app;
