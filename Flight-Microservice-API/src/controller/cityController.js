const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");

async function createCity(req, res) {
  try {
    console.log("Request Body:", req.body);

    const response = await CityService.createCity({
      name: req.body.name,
    });

    SuccessResponse.message = "Successfully Created an City";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
};
