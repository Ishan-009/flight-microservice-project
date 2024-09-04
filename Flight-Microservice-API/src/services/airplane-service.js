const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories/index");

const airplaneRepository = new AirplaneRepository();
const AppError = require("../utils/errors/app-error");
async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      console.log(error);
      error.errors.foreach((err) => {
        explanation.push(err.message);
      });
      console.log(explanation);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot Create instance of an airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes() {
  try {
    const airplane = await airplaneRepository.getAll();
    return airplane;
  } catch (error) {
    console.log("CAtch error else");
    throw new AppError(
      "Cannot fetch data of all airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airplane you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of an airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirplane(id) {
  try {
    const airplane = await airplaneRepository.destroy(id);
    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airplane you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot Delete instance of an airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(id, data) {
  try {
    const airplane = await airplaneRepository.update(id, data);
    return airplane;
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
  createAirplane,
  getAirplanes,
  getAirplane,
  deleteAirplane,
  updateAirplane,
};
