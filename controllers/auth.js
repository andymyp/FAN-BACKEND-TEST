const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger");
const auth_function = require("../functions/auth");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { error } = await auth_function.validateRegister(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: error.details[0].message,
      });
    }

    const existingEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingEmail) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "Email already exists",
      });
    }

    const existingNPP = await User.findOne({
      where: { npp: req.body.npp },
    });

    if (existingNPP) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "NPP already exists",
      });
    }

    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(req.body.password, salt);

    await User.create({ ...req.body, password });

    res.status(StatusCodes.CREATED).json({
      message: "Success create user",
    });
  } catch (error) {
    logger.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
