const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger");
const epresence_function = require("../functions/epresence");
const Epresence = require("../models/epresence");
const { Op } = require("sequelize");
const moment = require("moment-timezone");

exports.createEpresence = async (req, res) => {
  try {
    const { error } = await epresence_function.validateEpresence(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: error.details[0].message,
      });
    }

    const userId = req.user?.id;
    const userSupervisor = req.user?.npp_supervisor;

    console.log("userId", userId);
    console.log("userSupervisor", userSupervisor);

    if (!userId || userSupervisor === "" || userSupervisor === null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You don't have permission for this action.",
      });
    }

    const { type, time } = req.body;

    const currentDate = moment.tz(time, "Asia/Jakarta");
    const startOfDay = currentDate.clone().startOf("day");
    const endOfDay = currentDate.clone().endOf("day");

    const existingEpresence = await Epresence.findOne({
      where: {
        userId,
        type,
        time: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    if (existingEpresence) {
      return res.status(StatusCodes.CONFLICT).json({
        error: `You already ${type} for today.`,
      });
    }

    const newEpresence = await Epresence.create({
      userId: userId,
      type: type,
      time: currentDate,
      isApprove: "FALSE",
    });

    res.status(StatusCodes.CREATED).json({
      message: "Success create epresence",
      data: newEpresence.get(),
    });
  } catch (error) {
    logger.error("epresence/createEpresence error: " + error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
