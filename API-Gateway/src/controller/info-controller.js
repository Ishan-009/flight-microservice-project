const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const info = (req, res) => {
  try {
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "API is live",
      error: {},
      data: {},
    });
  } catch (error) {
    ErrorResponse.error = error;
    const errorResponse = serializeErrorObject(error);
    ErrorResponse.error = errorResponse;
    return res.status(error.statusCode).json(ErrorResponse);
  }

  // common api response structure
};

module.exports = {
  info,
};
