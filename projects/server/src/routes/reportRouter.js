const router = require("express").Router();
const { reportController } = require("../controllers");

router.get("/stock", reportController.getStockHistory);
router.get("/stock/summary", reportController.getAllStockHistory);

router.get("/sales", reportController.getSalesReport);
router.get("/sales/product", reportController.getSalesProduct);
router.get("/sales/category", reportController.getSalesCategory);
router.get("/sales/monthly", reportController.getMonthlySales);

module.exports = router;
