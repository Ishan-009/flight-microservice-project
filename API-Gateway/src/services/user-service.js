const { StatusCodes } = require("http-status-codes");
const { UserRepository, RoleRepository } = require("../repositories/index");
const {
  ErrorResponse,
  SuccessResponse,
  handleError,
} = require("../utils/common/index");
const bcrypt = require("bcrypt");
const AppError = require("../utils/errors/app-error");
const userRepository = new UserRepository();
const { Auth } = require("../utils/common");
const { Enums } = require("../utils/common/index");
const { USER_ROLE_ENUMS } = Enums;
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = USER_ROLE_ENUMS;
const roleRepository = new RoleRepository();
async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    console.log("user", user);
    const role = await roleRepository.getRoleByName(CUSTOMER);
    console.log("role", role);
    const response = await user.addRole(role); // Use addRoles instead of addRole
    console.log(response);
    return user;
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}

async function signIn(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email); // Await here

    if (!user) {
      throw new AppError(
        "No user found for given email",
        StatusCodes.NOT_FOUND
      );
    }

    const isValidPassword = Auth.checkPassword(data.password, user.password);

    if (!isValidPassword) {
      throw new AppError(
        "Incorrect Credentials",
        StatusCodes.BAD_REQUEST,
        true
      );
    }

    const jwt = Auth.createToken({ id: user.id, email: user.email });

    return jwt;
  } catch (error) {
    handleError(error);
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("Missing JWT Token", StatusCodes.BAD_REQUEST);
    }

    const response = Auth.verifyToken(token);
    const user = await userRepository.get(response.id);
    if (!user) {
      return new AppError("User not Found", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid Json Web Token", StatusCodes.BAD_REQUEST);
    } else if (error.name == "TokenExpiredError") {
      throw new AppError("JWT Token Expired", StatusCodes.BAD_REQUEST);
    } else {
      handleError(error);
    }
  }
}

async function addRoleToUser(data) {
  try {
    const user = await userRepository.get(data.userId);
    if (!user) {
      throw new AppError(
        "No user found for the given result",
        StatusCodes.NOT_FOUND
      );
    }
    const role = await roleRepository.getRoleByName(data.role);
    if (!role) {
      throw new AppError(
        "No role found for the given result",
        StatusCodes.NOT_FOUND
      );
    }
    user.addRole(role);
    return user;
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid Json Web Token", StatusCodes.BAD_REQUEST);
    } else if (error.name == "TokenExpiredError") {
      throw new AppError("JWT Token Expired", StatusCodes.BAD_REQUEST);
    } else {
      handleError(error);
    }
  }
}

async function isAdmin(id) {
  try {
    const user = await userRepository.get(id);
    if (!user) {
      throw new AppError(
        "No user found for the given result",
        StatusCodes.NOT_FOUND
      );
    }
    const adminRole = await roleRepository.getRoleByName(
      Enums.USER_ROLE_ENUMS.ADMIN
    );
    if (!adminRole) {
      throw new AppError(
        "No role found for the given result",
        StatusCodes.NOT_FOUND
      );
    }
    return user.hasRole(adminRole);
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      throw error;
    } else if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid Json Web Token", StatusCodes.BAD_REQUEST);
    } else if (error.name == "TokenExpiredError") {
      throw new AppError("JWT Token Expired", StatusCodes.BAD_REQUEST);
    } else {
      throw new AppError(
        "Something wrong occured",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = {
  createUser,
  signIn,
  isAuthenticated,
  addRoleToUser,
  isAdmin,
};
