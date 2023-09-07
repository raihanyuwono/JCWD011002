const bcrypt = require("bcrypt");
const db = require("../../database");
const { messages } = require("../../helpers");

const users = db["user"];

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function resetPassword(id, password) {
  password = await hashPassword(password);
  return await db.sequelize.transaction(async function (t) {
    await users.update({ password }, { where: { id }, transaction: t });
    return messages.success("Password successfully reseted");
  });
}

module.exports = resetPassword;
