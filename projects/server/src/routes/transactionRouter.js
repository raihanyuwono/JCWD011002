const router = require("express").Router();
const { userOrderController } = require("../controllers");

//get payment methods
router.get("/", userOrderController.getPayment);
// create transactiong
router.post("/", userOrderController.addTransaction);
// get distance
router.post("/distance", userOrderController.getDistance);

module.exports = router;
