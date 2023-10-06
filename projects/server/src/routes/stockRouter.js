const createMutation = require("../services/stockService/createMutation");
const authentication = require("../middlewares/authentication");
const updateStatusMutation = require("../services/stockService/updateStatusMutation");

const router = require("express").Router();

// router.patch("/", authentication, updateStock)
router.post("/", authentication, createMutation)
router.patch("/:id", authentication, updateStatusMutation)

module.exports = router;