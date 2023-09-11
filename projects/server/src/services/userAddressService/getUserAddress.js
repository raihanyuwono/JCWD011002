const db = require("../../database/models");
const UserAddress = db.user_address;
const { messages } = require("../../helpers");

const getUserAddress = async (id) => {
  const result = await UserAddress.findAll({ where: { id_user: id } });
  return messages.success('successfully get user address', result)
}

module.exports = getUserAddress