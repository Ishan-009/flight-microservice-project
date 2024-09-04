const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BOOKING_SERVICE:process.env.BOOKING_SERVICE,
};
