const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
async function createAirplane(req, res) {
  try {
    console.log("Request Body:", req.body);

    const response = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    console.log("Service Response:", response);

    SuccessResponse.message = "Successfully Created an Airplane";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirplanes(req, res) {
  try {
    const response = await AirplaneService.getAirplanes();

    SuccessResponse.message = "Successfully Fetched all Airplanes";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirplane(req, res) {
  try {
    const id = req.params.id;
    const response = await AirplaneService.getAirplane(id);

    SuccessResponse.message = "Successfully Fetched an Airplane";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteAirplane(req, res) {
  try {
    const id = req.params.id;
    const response = await AirplaneService.deleteAirplane(id);

    SuccessResponse.message = "Successfully Deleted an Airplane";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirplane(req, res) {
  try {
    const id = req.params.id;
    const response = await AirplaneService.updateAirplane(id, {
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });

    SuccessResponse.message = "Successfully Updated an Airplane";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  deleteAirplane,
  updateAirplane,
};
