const { user, sequelize } = require('../../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { messages } = require('../../helpers')
const fs = require('fs')

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const bodyData = async (body, password, req, user) => {
  let updateData = {
    name: body.name,
    username: body.username,
    email: body.email,
    phone: body.phone,
    password: password,
    is_verified: body.is_verified,
    id_role: body.id_role
  }
  if (req.file && req.file.path) {
    updateData.avatar = req.file.path
    if (user.avatar && fs.existsSync(user.avatar)) {
      fs.unlinkSync(user.avatar)
    }
  }
  return updateData
}

const checkPassword = async (body, userLogin) => {
  let password = userLogin.password;
  if (body.current_password && body.new_password && body.confirm_password) {
    if (body.new_password !== body.confirm_password) {
      throw new Error('password not match');
    }
    const currentPassword = await bcrypt.compare(body.current_password, userLogin.password)
    if (!currentPassword) {
      throw new Error('Wrong password');
    }
    password = await hashPassword(body.new_password)
  }
  return password;
}
const updateProfile = async (req, id, body) => {
  try {
    const userLogin = await user.findOne({
      where: { id }
    })
    if (!userLogin) return messages.error(404, 'User not found')

    let password;
    try {
      password = await checkPassword(body, userLogin)
    } catch (error) {
      return messages.error(400, error.message)
    }
    const updateData = await bodyData(body, password, req, userLogin)
    return await sequelize.transaction(async (t) => {
      await user.update(updateData, { where: { id }, transaction: t })
      return messages.success('Profile updated successfully')
    })
  } catch (error) {
    console.log(error)
    return messages.error(500, error.message || 'Internal server error.')
  }
}

module.exports = updateProfile