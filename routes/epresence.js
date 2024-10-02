const router = require("express").Router();
const controller = require("../controllers/epresence");

router.post("/epresence", controller.createEpresence);
router.get("/epresence", controller.getEpresences);

module.exports = router;
