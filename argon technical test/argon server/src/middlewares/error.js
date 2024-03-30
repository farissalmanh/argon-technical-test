const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

require("dotenv").config();

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message, stack } = err;

  res.locals.errorMessage = message;

  const response = {
    status: true,
    type: "error",
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack }),
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
