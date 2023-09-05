const router = require("express").Router();
const { authentication, validation } = require("../middlewares");
const { authController } = require("../controllers");

// Register - for member and admin
router.post(
  "/user",
  validation.register,
  validation.result,
  authController.register
);
// Registration - Complete data
router.put(
  "/user",
  authentication,
  validation.registration,
  validation.result,
  authController.registration
);

module.exports = router;
