const { getUserAddress, createUserAddress, updateUserAddress, deleteUserAddress } = require("../controllers/userAddressController");
const authentication = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/", authentication, createUserAddress);
router.get("/", authentication, getUserAddress)
router.patch("/:addressId", authentication, updateUserAddress);
router.delete("/:addressId", authentication, deleteUserAddress);
module.exports = router