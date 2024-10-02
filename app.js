require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/sequelize");
const logger = require("./config/logger");

const app = express();

//! Middlewares
app.use(cors());
app.use(express.json());

//! Public Routes
app.use("/status", (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Server is running",
  });
});

//! Not Found
app.all("*", (req, res) => {
  res.status(404).json({ message: "Endpoint was not found" });
});

//! Connection
const APP_PORT = process.env.APP_PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    logger.info("PostgreSQL connected");

    app.listen(APP_PORT, () => {
      logger.info("App running in port: " + APP_PORT);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to the database:", err.message);
  });
