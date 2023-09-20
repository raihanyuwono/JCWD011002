const router = require('express').Router();
const { createWarehouse, updateWarehouse, deleteWarehouse, getWarehouse } = require('../controllers/warehouseController');
const { authentication } = require('../middlewares');
router.get("/", authentication, getWarehouse)
router.post("/", authentication, createWarehouse)
router.patch("/:id", authentication, updateWarehouse)
router.delete("/:id", authentication, deleteWarehouse)


module.exports = router