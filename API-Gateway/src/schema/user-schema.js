// schemas.js

const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
}).options({ abortEarly: false });

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
}).options({ abortEarly: false });

module.exports = { signupSchema, signinSchema };
