const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../../database/models");
const { messages } = require("../../helpers");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const changePassword = async (id, body) => {
  try {
    const userLogin = await user.findOne({
      where: { id }
    })
    if (!userLogin) return messages.error(404, 'User not found')
    const currentPassword = await bcrypt.compare(body.current_password, userLogin.password)
    if (!currentPassword) return messages.error(400, 'Wrong password')
    if (body.new_password !== body.confirm_password) return messages.error(400, 'password not match')
    const password = await hashPassword(body.new_password)
    return await sequelize.transaction(async (t) => {
      await user.update({ password: password }, { where: { id }, transaction: t })
      return messages.success('Password updated successfully')
    })
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message || 'Internal server error.')
  }
}

module.exports = changePassword