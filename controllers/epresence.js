const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger");
const epresence_function = require("../functions/epresence");
const Epresence = require("../models/epresence");
const { Op } = require("sequelize");
const moment = require("moment-timezone");
const User = require("../models/user");

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

    if (!userId || userSupervisor === "" || userSupervisor === null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You don't have permission. This require User role.",
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

    await Epresence.create({
      userId: userId,
      type: type,
      time: currentDate,
    });

    res.status(StatusCodes.CREATED).json({
      message: `Success create ${type} epresence`,
    });
  } catch (error) {
    logger.error("epresence/createEpresence error: " + error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

exports.getEpresences = async (req, res) => {
  try {
    const userId = req.user?.id;
    const userSupervisor = req.user?.npp_supervisor;

    if (!userId || userSupervisor === "" || userSupervisor === null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You don't have permission. This require User role.",
      });
    }

    const epresences = await Epresence.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const groupedRecords = {};

    epresences.forEach((epresence) => {
      const date = moment(epresence.time).format("YYYY-MM-DD");

      if (!groupedRecords[date]) {
        groupedRecords[date] = {
          userId: epresence.userId,
          userName: epresence.User.name,
          date,
          inTime: null,
          outTime: null,
          inStatus: null,
          outStatus: null,
        };
      }

      if (epresence.type === "IN") {
        groupedRecords[date].inTime = moment(epresence.time).format("HH:mm:ss");
        groupedRecords[date].inStatus =
          epresence.isApprove === "TRUE"
            ? "APPROVE"
            : epresence.isApprove === "FALSE"
            ? "REJECT"
            : "WAITING";
      } else if (epresence.type === "OUT") {
        groupedRecords[date].outTime = moment(epresence.time).format(
          "HH:mm:ss"
        );
        groupedRecords[date].outStatus =
          epresence.isApprove === "TRUE"
            ? "APPROVE"
            : epresence.isApprove === "FALSE"
            ? "REJECT"
            : "WAITING";
      }
    });

    res.status(StatusCodes.CREATED).json({
      message: "Success get epresence",
      data: Object.values(groupedRecords),
    });
  } catch (error) {
    logger.error("epresence/getEpresences error: " + error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

exports.getUserEpresences = async (req, res) => {
  try {
    const userId = req.user?.id;
    const userSupervisor = req.user?.npp_supervisor;
    const nppSupervisor = req.user?.npp;

    console.log("userSupervisor", userSupervisor);

    if (!userId || (userSupervisor !== "" && userSupervisor !== null)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "You don't have permission. This require Supervisor role.",
      });
    }

    const epresences = await Epresence.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "npp_supervisor"],
          where: {
            npp_supervisor: nppSupervisor,
          },
        },
      ],
    });

    const groupedRecords = {};

    epresences.forEach((epresence) => {
      const nameUser = epresence.User.name;
      const date = moment(epresence.time).format("YYYY-MM-DD");
      const group = nameUser + date;

      if (!groupedRecords[group]) {
        groupedRecords[group] = {
          nppSupervisor: nppSupervisor,
          userId: epresence.userId,
          userName: epresence.User.name,
          date,
          inTime: null,
          outTime: null,
          inStatus: null,
          outStatus: null,
        };
      }

      if (epresence.type === "IN") {
        groupedRecords[group].inTime = moment(epresence.time).format(
          "HH:mm:ss"
        );
        groupedRecords[group].inStatus =
          epresence.isApprove === "TRUE"
            ? "APPROVE"
            : epresence.isApprove === "FALSE"
            ? "REJECT"
            : "WAITING";
      } else if (epresence.type === "OUT") {
        groupedRecords[group].outTime = moment(epresence.time).format(
          "HH:mm:ss"
        );
        groupedRecords[group].outStatus =
          epresence.isApprove === "TRUE"
            ? "APPROVE"
            : epresence.isApprove === "FALSE"
            ? "REJECT"
            : "WAITING";
      }
    });

    res.status(StatusCodes.CREATED).json({
      message: "Success get epresence",
      data: Object.values(groupedRecords),
    });
  } catch (error) {
    logger.error("epresence/getEpresences error: " + error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};
