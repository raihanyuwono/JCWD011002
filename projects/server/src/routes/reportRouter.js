const router = require("express").Router();
const { reportController } = require("../controllers");

router.get("/", reportController.getStockHistory);


module.exports = router;
