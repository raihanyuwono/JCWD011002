const router = require("express").Router();
const { userOrderController } = require("../controllers");
const { multer } = require("../middlewares");

//get payment methods
router.get("/", userOrderController.getPayment);
// create transactiong
router.post("/", userOrderController.addTransaction);
// get distance
router.post("/distance", userOrderController.getDistance);
// get transaction by user
router.get("/:userId", userOrderController.getTransaction);
// get detail transaction
router.post("/detail", userOrderController.getDetailTransaction);

//upload receipt
router.post(
  "/receipt/:transactionId",
  multer.multerUpload("receipt"),
  userOrderController.UploadReceipt
);

module.exports = router;
