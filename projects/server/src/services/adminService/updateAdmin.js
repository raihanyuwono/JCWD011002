const db = require("../../database");
const { messages } = require("../../helpers");

const admins = db["admin"];
const users = db["user"];

async function updateAdmin(access, id, attributes) {
  const { role, is_active, warehouse } = attributes;
  // Check if access only for admin
  if (access !== "admin") return messages.error(401, "Unauthorized access");

  // Update data user - only role, warehouse, and is_active
  db.sequelize.transaction(async function (t) {
    if (role)
      await users.update({ id_role: role }, { where: { id }, transaction: t });
    if (is_active)
      await users.update({ is_active }, { where: { id }, transaction: t });
    if (warehouse)
      await admins.update(
        { id_warehouse: warehouse },
        { where: { id_user: id }, transaction: t }
      );
  });

  return messages.success("Data successfully updated");
}

module.exports = updateAdmin;
