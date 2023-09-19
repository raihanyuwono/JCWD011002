const router = require("express").Router();
const { adminController } = require("../controllers");
const { authentication, authorization } = require("../middlewares");

// Roles list
router.get("/roles", authentication, authorization, adminController.getRoles);

module.exports = router;
