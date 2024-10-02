const router = require("express").Router();
const controller = require("../controllers/epresence");

router.post("/epresence", controller.createEpresence);
router.get("/epresence", controller.getEpresences);
router.get("/supervisor/epresence", controller.getUserEpresences);

module.exports = router;
