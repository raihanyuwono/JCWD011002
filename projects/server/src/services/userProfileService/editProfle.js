const {user, sequelize} = require('../../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {messages} = require('../../helpers')

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
const updateProfile = async (id, body) => {
  try {
    const userLogin = await user.findOne({
      where: {id}
    })
    if(!userLogin) return messages.error(404, 'User not found')
    let updateData = {
      name: body.name,
      username: body.username,
      email: body.email,
      phone: body.phone,
      password: body.password,
      is_verified: body.is_verified,
      id_role: body.id_role
    }
    if(req.file && req.file.path) {
      updateData.avatar = req.file.path
      if(user.avatar && fs.existsSync(user.avatar)) {
        fs.unlinkSync(user.avatar)
      }
    }

    await sequelize.transaction(async (t) => {
      await user.update(updateData, {where: {id}, transaction: t})
      return messages.success('Profile updated successfully')
    })
  } catch (error) {
    return messages.error(500, error.message || 'Internal server error.')
  }
}

module.exports = updateProfile