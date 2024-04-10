const httpStatus = require('http-status');
const { errorResponse } = require('./responseTransformer');
 
const ApiError = require('./apiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const { statusCode } = error;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};


const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  res.locals.errorMessage = err.message;
  console.log('err',err);
  //console.log('message',message);
  return errorResponse(req, res, statusCode, message, err);
};


module.exports = {
    errorConverter,
    errorHandler
};
