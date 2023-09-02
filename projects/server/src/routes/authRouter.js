const router = require("express").Router();
const { authController } = require("../controllers");

// Register - for member and admin
router.post("/users", authController.register);

module.exports = router;
