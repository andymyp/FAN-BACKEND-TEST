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

//! Auth Route
app.use("/api/auth", require("./routes/auth"));

//! Auth Middleware
app.use(require("./middleware/auth"));

//! Protected Routes
app.use("/api/test-auth", (req, res) => {
  res.status(200).json({
    message: "Authorized!",
    data: req.user,
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
  .then(async () => {
    logger.info("PostgreSQL connected");

    await sequelize
      .sync()
      .then(() => logger.info("Database synced"))
      .catch((err) => logger.error("Error syncing database", err.message));

    app.listen(APP_PORT, () => {
      logger.info("App running in port: " + APP_PORT);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to the database:", err.message);
  });
