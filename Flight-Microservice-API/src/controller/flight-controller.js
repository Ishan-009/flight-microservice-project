const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
const { FlightRepository } = require("../repositories");
async function createFlight(req, res) {
  try {
    const response = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });

    if (response.error) {
      return res
        .status(response.error.statusCode)
        .json({ success: false, error: response.error });
    }

    SuccessResponse.message = "Successfully Created an Flight";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllFlights(req, res) {
  try {
    const flight = await FlightService.getAllFlights(req.query);
    SuccessResponse.message = "Successfully Fetched Flights";
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getFlight(req, res) {
  try {
    const id = req.params.id;
    const response = await FlightService.getFlight(id);

    SuccessResponse.message = "Successfully Fetched an Flight";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateSeats(req, res) {
  try {
    const response = await FlightService.updateSeats({
      flightId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    SuccessResponse.message = "Successfully Fetched an Flight";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
