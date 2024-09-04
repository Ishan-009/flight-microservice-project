const { StatusCodes } = require("http-status-codes");
const AppError = require("../errors/app-error");
function handleError(error) {
  if (error instanceof AppError) {
    throw error;
  } else if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    const explanation = error.errors.map((err) => err.message);

    throw new AppError(explanation, StatusCodes.BAD_REQUEST);
  } else if (error.name === "SequelizeForeignKeyConstraintError") {
    // Handle foreign key constraint errors
    throw new AppError(
      "Foreign key constraint violation.",
      StatusCodes.BAD_REQUEST
    );
  } else if (error.name === "SequelizeDatabaseError") {
    // Handle database errors
    throw new AppError(
      "Database error occurred.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  } else {
    throw new AppError(
      "Something went wrong.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = handleError;
