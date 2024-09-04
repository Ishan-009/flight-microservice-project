const { StatusCodes } = require("http-status-codes");
const info = (req, res) => {
  console.log("Recieved Request inside flight service");

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "API is live",
    error: {},
    data: {},
  });

  // common api response structure
};

module.exports = {
  info,
};
