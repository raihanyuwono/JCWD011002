const { messages } = require('../helpers')
const { userAddressService } = require('../services')
const getUserAddress = async (req, res) => {
  try {
    const { id } = req.account
    const result = await userAddressService.getUserAddress.getUserAddress(id);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

const getUserAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const id_user = req.account.id
    const result = await userAddressService.getUserAddress.getUserAddressById(id, id_user);
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

const createUserAddress = async (req, res) => {
  try {
    const { id } = req.account
    const id_user = req.account.id
    const { name, province, city_name, postal_code, full_address, is_default } = req.body
    const body = { name, province, city_name, postal_code, full_address, is_default }
    const result = await userAddressService.createUserAddress(id, body, id_user)
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const id_user = req.account.id
    const { name, province, city_name, postal_code, full_address, is_default } = req.body;
    const body = { name, province, city_name, postal_code, full_address, is_default };
    const result = await userAddressService.updateUserAddress(id, body, id_user);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userAddressService.deleteUserAddress(id);
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
  deleteUserAddress,
  getUserAddressById
}
