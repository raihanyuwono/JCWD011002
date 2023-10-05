const { createProductCategory, getAllCategory, updateProductCategory, deleteProductCategory, getProductList, getProductById, createProduct, updateProduct, updateStock,   getProducts,
  getProduct, } = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
// const createProduct = require('../services/productService/createProduct');
const multer = require('../middlewares/multer');
// const updateProduct = require('../services/productService/updateProduct');
// const getProductList = require('../services/productService/getProduct');
const disableProduct = require('../services/productService/deleteProduct');
// const getProductById = require('../services/productService/getProductById');
// const updateStock = require('../services/stockService/updateStock');

const router = require("express").Router();

router.patch("/stock", authentication, updateStock)
// category routes
router.get("/category", getAllCategory)
router.post("/category", authentication, createProductCategory)
router.patch("/category/:id", authentication, updateProductCategory)
router.delete("/category/:id", authentication, deleteProductCategory)

// product routes
router.get("/admin", authentication, getProductList)
router.get("/admin/:id", authentication, getProductById)
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", authentication, multer.multerUpload("image"), createProduct)
router.patch("/:id", authentication, multer.multerUpload("image"), updateProduct)
router.patch("/:id", authentication, disableProduct)

module.exports = router 
