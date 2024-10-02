const Joi = require("joi");

exports.validateRegister = async (request) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    npp: Joi.string().required(),
    npp_supervisor: Joi.string(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(request);
};

exports.validateLogin = async (request) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(request);
};
