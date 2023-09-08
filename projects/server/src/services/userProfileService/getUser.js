const { user } = require("../../database/models")
const { messages } = require("../../helpers")

const getUser = async (id) => {
  const userLogin = await user.findByPk(id)
  return messages.success('successfully get user data', userLogin)
}
module.exports = getUser