// airplaneMiddleware.js
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/errors/common/index");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["Model Number not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
