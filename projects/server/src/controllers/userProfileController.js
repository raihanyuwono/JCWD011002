const {messages} = require('../helpers')
const { userProfileService } = require("../services")

const updateProfile = async (req, res) => {
  try {
    const {id} = req.account
    const {name, username, email, phone, password, is_verified, id_role} = req.body
    const body = { name, username, email, phone, password, is_verified, id_role}
    const result = await userProfileService.updateProfile(id, body)
    res.status(result.status).json(messages.response(result))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = updateProfile