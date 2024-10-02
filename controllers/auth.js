const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger");
const auth_function = require("../functions/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

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
    logger.error("auth/register error: " + error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = await auth_function.validateLogin(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: error.details[0].message,
      });
    }

    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Email or password wrong",
      });
    }

    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!matchPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Email or password wrong",
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    delete user.dataValues.password;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;

    res.status(StatusCodes.OK).json({
      message: "Success login",
      data: { ...user.dataValues, token },
    });
  } catch (error) {
    logger.error("auth/login error: " + error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
