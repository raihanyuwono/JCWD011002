const { createProductCategory, getAllCategory, updateProductCategory, deleteProductCategory } = require('../controllers/productController');
const authentication = require('../middlewares/authentication');
const createProduct = require('../services/productService/createProduct');
const multer = require('../middlewares/multer');
const updateProduct = require('../services/productService/updateProduct');
const getProductList = require('../services/productService/getProduct');
const disableProduct = require('../services/productService/deleteProduct');

const router = require('express').Router();

// category routes
router.get("/category", authentication, getAllCategory)
router.post("/category", authentication, createProductCategory)
router.patch("/category/:id", authentication, updateProductCategory)
router.delete("/category/:id", authentication, deleteProductCategory)

// product routes
router.get("/", authentication, getProductList)
router.get("/:id")
router.post("/", authentication, multer.multerUpload("image"), createProduct)
router.patch("/:id", authentication, multer.multerUpload("image"), updateProduct)
router.patch("/:id", authentication, disableProduct)

module.exports = router