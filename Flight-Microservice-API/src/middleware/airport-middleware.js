// airplaneMiddleware.js
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common/index");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["Airport Name not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.code) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["Airport Name not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.cityId) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["Airport CityId not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
