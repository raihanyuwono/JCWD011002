const router = require("express").Router();
const { reportController } = require("../controllers");

router.get("/", reportController.getStockHistory);
router.get("/all", reportController.getAllStockHistory);

module.exports = router;
