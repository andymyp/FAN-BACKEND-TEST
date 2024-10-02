const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Access denied. No Bearer token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "null" || token === "undefined" || token === "") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Access denied. No Bearer token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({
      where: { email: decoded.email },
    });

    delete user.dataValues.password;
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;

    req.user = user.get();
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Invalid or expired token.",
    });
  }
};

module.exports = authentication;
