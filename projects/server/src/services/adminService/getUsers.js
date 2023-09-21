const { Op, col } = require("sequelize");
const db = require("../../database");
const { messages, pagination } = require("../../helpers");

const admins = db["admin"];
const users = db["user"];
const roles = db["role"];
const warehouses = db["warehouse"];

const exclude = ["password", "is_verified", "id_role", "created_at", "updated_at"];

const include = [
  {
    model: users,
    attributes: { exclude },
    include: {
      model: roles,
      attributes: ["name"],
    },
  },
  { model: warehouses, attributes: ["name"] },
];

async function getUsers(access, query) {
  const { name, role, page = 1, limit = 10 } = query;
  // Check if access only for admin
  if (access !== "admin") return messages.error(401, "Unauthorized access");
  //Pagination
  const counter = await admins.count({
    include,
  });
  const pages = pagination.setPagination(page, limit);

  const result = await admins.findAll({
    attributes: [],
    include,
    order: [[users, roles, "name", "ASC"]],
    ...pages,
  });
  const payload = {
    pages: Math.ceil(counter / limit),
    users: result,
  };
  return messages.success("", payload);
}

module.exports = getUsers;
