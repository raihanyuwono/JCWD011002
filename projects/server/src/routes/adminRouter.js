const router = require("express").Router();
const { adminController } = require("../controllers");
const { authentication, authorization } = require("../middlewares");

// Roles list
router.get("/roles", authentication, authorization, adminController.getRoles);
// Update admin - change role, warehouse, and delete(active)
router.get("/user/:id", authentication, authorization, adminController.updateAdmin);

module.exports = router;
