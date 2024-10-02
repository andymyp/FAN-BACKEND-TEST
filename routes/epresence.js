const router = require("express").Router();
const controller = require("../controllers/epresence");

router.post("/epresence", controller.createEpresence);

module.exports = router;
