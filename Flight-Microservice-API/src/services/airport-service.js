const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories/index");

const airportRepository = new AirportRepository();
const AppError = require("../utils/errors/app-error");
async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.foreach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot Create instance of an airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airport = await airportRepository.getAll();
    return airport;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of an airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirport(id) {
  try {
    const airport = await airportRepository.destroy(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The airport you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Delete instance of an airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("Requested Resource not found", error.statusCode);
    }
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      console.log(error);
      error.errors.foreach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  deleteAirport,
  updateAirport,
};
