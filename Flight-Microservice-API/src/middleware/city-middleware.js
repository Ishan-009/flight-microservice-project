// airplaneMiddleware.js
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common/index");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["City name not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
