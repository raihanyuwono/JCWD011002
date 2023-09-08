const router = require("express").Router();
const { getUser, updateProfile, changePassword } = require("../controllers/userProfileController");
const { authentication, multer } = require("../middlewares");

router.get("/", authentication, getUser)
router.patch("/", authentication, multer.multerUpload("avatar"), updateProfile)
router.patch("/", authentication, changePassword)
module.exports = router;
