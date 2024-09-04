// airplaneMiddleware.js
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common/index");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["flightNumber  not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["airplaneId  not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["departureAirportId(code, eg:-BLR) not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["arrivalAirportId(code:-DEL) not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["arrivalTime not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["departureTime not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["price not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.boardingGate) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["boardingGate not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["totalSeats not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.params.id) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["flightId  not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.seats) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = new AppError(
      ["seats not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
