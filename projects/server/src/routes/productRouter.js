const {
  createProductCategory,
  getAllCategory,
  updateProductCategory,
  deleteProductCategory,
  getProducts,
} = require("../controllers/productController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

// category routes
router.get("/category", getAllCategory);
router.post("/category", authentication, createProductCategory);
router.patch("/category/:id", authentication, updateProductCategory);
router.delete("/category/:id", authentication, deleteProductCategory);

// product routes
router.get("/", getProducts);
router.get("/:id");
router.post("/");
router.patch("/:id");
router.delete("/:id");

module.exports = router;
