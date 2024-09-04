const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
async function createAirport(req, res) {
  try {
    const response = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });

    SuccessResponse.message = "Successfully Created an Airport";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const response = await AirportService.getAirports();

    SuccessResponse.message = "Successfully Fetched all Airports";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirport(req, res) {
  try {
    const id = req.params.id;
    const response = await AirportService.getAirport(id);

    SuccessResponse.message = "Successfully Fetched an Airport";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteAirport(req, res) {
  try {
    const id = req.params.id;
    const response = await AirportService.deleteAirport(id);

    SuccessResponse.message = "Successfully Deleted an Airplane";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirport(req, res) {
  try {
    const id = req.params.id;
    const response = await AirportService.updateAirport(id, {
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });

    SuccessResponse.message = "Successfully Updated an Airport";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  deleteAirport,
  updateAirport,
};
