const router = require("express").Router();
const { userOrderController } = require("../controllers");

// create transactiong
router.post("/", userOrderController.addTransaction);

module.exports = router;
