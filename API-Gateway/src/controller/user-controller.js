const { UserService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
const {
  serializeErrorObject,
  serializeUserObject,
} = require("../utils/helpers/serialize-response");
async function createUser(req, res) {
  try {
    const user = await UserService.createUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    SuccessResponse.message = "Successfully Created an User";
    const serializedUser = serializeUserObject(user);
    SuccessResponse.data = serializedUser;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    const errorResponse = serializeErrorObject(error);
    ErrorResponse.error = errorResponse;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signIn(req, res) {
  try {
    const response = await UserService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(response);
    SuccessResponse.message = "User Signed in successfully";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const errorResponse = serializeErrorObject(error);
    ErrorResponse.error = errorResponse;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function addRoleToUser(req, res) {
  try {
    console.log("controller", req.body);
    const response = await UserService.addRoleToUser({
      userId: req.body.userId,
      role: req.body.role,
    });
    SuccessResponse.message = "User Role Added successfully";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    const errorResponse = serializeErrorObject(error);
    ErrorResponse.error = errorResponse;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createUser,
  signIn,
  addRoleToUser,
};
