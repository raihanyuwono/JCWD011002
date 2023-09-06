const router = require("express").Router();
const { userOrderController } = require("../controllers");

router.post("/", userOrderController.addTransaction);
module.exports = router;
