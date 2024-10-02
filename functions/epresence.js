const Joi = require("joi");

exports.validateEpresence = async (request) => {
  const schema = Joi.object({
    type: Joi.string().valid("IN", "OUT").required(),
    time: Joi.date().required(),
  });

  return schema.validate(request);
};

exports.validateApproveEpresence = async (request) => {
  const schema = Joi.object({
    isApprove: Joi.string().valid("TRUE", "FALSE").required(),
  });

  return schema.validate(request);
};
