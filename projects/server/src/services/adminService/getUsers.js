const { Op } = require("sequelize");
const db = require("../../database");
const { messages, pagination } = require("../../helpers");

const users = db["user"];
const roles = db["role"];
const warehouses = db["warehouse"];

const include = [
  { model: roles, attributes: ["name"], where: { name: { [Op.not]: "user" } } },
  { model: warehouses, attributes: ["name"], through: { attributes: [] } },
];

const exclude = ["password", "is_verified", "id_role"];

async function getUsers(access, query) {
  const { name, role, page, limit } = query;
  // Check if access only for admin
  if (access !== "admin") return messages.error(401, "Unautorized access");
  // Pagination
  const pages = pagination.setPagination(page, limit);
  const result = await users.findAll({
    attributes: { exclude },
    include,
    order: [[roles, "name", "ASC"]],
    ...pagination,
  });
  return messages.success("", result);
}

module.exports = getUsers;
