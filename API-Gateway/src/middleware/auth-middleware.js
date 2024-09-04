const { StatusCodes } = require("http-status-codes");
const { signupSchema, signinSchema } = require("../schema/user-schema");
const { UserService } = require("../services");
const AppError = require("../utils/errors/app-error");
const { ErrorResponse } = require("../utils/common");

const validateUserSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  // Check if error is defined before accessing its details
  if (error) {
    return res.status(400).json({
      message: "Invalid signup data",
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  next();
};

const validateUserSignin = (req, res, next) => {
  const { error } = signinSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Invalid signin data",
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  next();
};

async function checkAuth(req, res, next) {
  try {
    const isAuthenticated = await UserService.isAuthenticated(
      req.headers["x-access-token"]
    );
    if (isAuthenticated) {
      req.user = isAuthenticated;
      next();
    }
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof AppError) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Something Wrong Occurred",
      },
    });
  }
}

async function isAdmin(req, res, next) {
  try {
    // getting req.user form previous middleware :- auth check middleware
    const response = await UserService.isAdmin(req.user);
    console.log("isAdmin", response);
    if (!response) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User unauthorized to take this action" });
    }
    next();
  } catch (error) {
    console.log("middleware catch", error);

    if (error.name == "TokenExpiredError") {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
    if (error instanceof AppError) {
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Something Wrong Occurred",
      },
    });
  }
}

module.exports = {
  validateUserSignup,
  validateUserSignin,
  checkAuth,
  isAdmin,
};
