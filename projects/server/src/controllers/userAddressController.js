const { messages } = require('../helpers')
const { userAddressService } = require('../services')

const getUserAddress = async (req, res) => {
  try {
    const { id } = req.account
    const result = await userAddressService.getUserAddress(id);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

const createUserAddress = async (req, res) => {
  try {
    const { id } = req.account
    const { name, province, city_name, postal_code, full_address, is_default } = req.body
    const body = { name, province, city_name, postal_code, full_address, is_default }
    const result = await userAddressService.createUserAddress(id, body)
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.account;
    console.log('id user address', id)
    const { addressId } = req.params;
    console.log('addressId', addressId)
    const { name, province, city_name, postal_code, full_address, is_default } = req.body;
    const body = { name, province, city_name, postal_code, full_address, is_default };
    const result = await userAddressService.updateUserAddress(addressId, body);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.account;
    const { addressId } = req.params;
    const result = await userAddressService.deleteUserAddress(addressId);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
}