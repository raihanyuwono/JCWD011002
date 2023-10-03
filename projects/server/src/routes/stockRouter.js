const updateStock = require("../services/stockService/updateStock");

const router = require("express").Router();

router.patch("/", updateStock)

module.exports = router;