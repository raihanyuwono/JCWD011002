const router = require("express").Router();
const { getUser, updateProfile, changePassword } = require("../controllers/userProfileController");
const { authentication, multer, validation } = require("../middlewares");

router.get("/", authentication, getUser)
router.patch("/", authentication, multer.multerUpload("avatar"), validation.updateProfile, validation.result, updateProfile)
router.patch("/password", authentication, changePassword)
module.exports = router;
