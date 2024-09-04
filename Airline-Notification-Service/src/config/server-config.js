const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
  GMAIL_PASS: process.env.GMAIL_PASSWORD,
  GMAIL_EMAIL: process.env.GMAIL_EMAIL,
};
