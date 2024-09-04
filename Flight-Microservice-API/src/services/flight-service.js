const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories/index");
const { Op } = require("sequelize");
const flightRepository = new FlightRepository();
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/datetime-helper");
async function createFlight(data) {
  try {
    const isValidTime = compareTime(data.arrivalTime, data.departureTime);
    const flight = await flightRepository.create(data);
    if (!isValidTime) {
      const ErrorResponse = new AppError(
        "Arrival Time should be greater than Departure Time",
        StatusCodes.BAD_REQUEST
      );

      return { error: ErrorResponse, data: null };
    }

    return flight;
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.foreach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    } else {
      throw new AppError(
        "Cannot Create instance of an flight",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = {};
  if (query.trips) {
    let [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;

    // Todo add a check if they are same
  }

  if (query.price) {
    let [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice ?? 0, maxPrice == undefined ? 20000 : maxPrice],
    };
  }
  // available number of seats based on searching filter for number of travellers

  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  const endingTripTime = " 23:59:00";
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    console.log(params);
    const sortFilters = params.map((param) => {
      return param.split("_");
    });
    sortFilter = sortFilters;
  }

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot fetch data of all airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The flight you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of an airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Cannot update data of the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
