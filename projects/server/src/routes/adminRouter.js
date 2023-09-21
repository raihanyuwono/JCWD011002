const router = require("express").Router();
const { adminController } = require("../controllers");
const { authentication, authorization } = require("../middlewares");

// Roles list
router.get("/roles", authentication, authorization, adminController.getRoles);
// admin wh
router.get(
  "/roles/warehouse",
  authentication,
  authorization,
  adminController.getAdmin
);
// Update admin - change role, warehouse, and delete(active)
router.patch(
  "/user/:id",
  authentication,
  authorization,
  adminController.updateAdmin
);

module.exports = router;
