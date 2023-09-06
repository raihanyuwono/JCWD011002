const router = require("express").Router();
const updateProfile = require("../controllers/userProfileController");
const {authentication, multer} = require("../middlewares");
const { multerUpload, handleFileSizeError } = require("../middlewares/multer");

router.get("/user", authentication)
router.patch("/user", authentication, multer.multerUpload.single("avatar"),multer.handleFileSizeError, updateProfile)

module.exports = router;
