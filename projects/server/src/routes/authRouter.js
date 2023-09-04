const router = require("express").Router();
const { authentication } = require("../middlewares");
const { authController } = require("../controllers");

// Register - for member and admin
router.post("/user", authController.register);
// Registration - Complete data
router.put("/user", authentication, authController.registration);

module.exports = router;
