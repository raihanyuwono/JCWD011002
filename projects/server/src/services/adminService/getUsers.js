const { Op, col } = require("sequelize");
const db = require("../../database");
const { messages, pagination } = require("../../helpers");

const admins = db["admin"];
const users = db["user"];
const roles = db["role"];
const warehouses = db["warehouse"];

const exclude = [
  "password",
  "is_verified",
  "id_role",
  // "created_at",
  "updated_at",
];

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

function setWhere(id, search = "", role, warehouse) {
  const conditions = {
    id_user: { [Op.not]: id },
    "$user.name$": { [Op.like]: `%${search}%` },
  };
  if (role) conditions["$user.id_role$"] = role;
  if (warehouse) conditions["id_warehouse"] = warehouse;
  return conditions;
}

async function getUsers(access, id, query) {
  const { search, role, warehouse, sort, page = 1, limit = 10 } = query;
  // Check if access only for admin
  if (access !== "admin") return messages.error(401, "Unauthorized access");
  //Pagination
  const pages = pagination.setPagination(page, limit);

  const { count, rows: result } = await admins.findAndCountAll({
    attributes: [],
    include,
    order: [
      [users, "name", sort || "ASC"],
      [users, roles, "name", "ASC"],
      [warehouses, "name", "ASC"],
    ],
    where: setWhere(id, search, role, warehouse),
    subQuery: false,
    ...pages,
  });

  const payload = {
    pages: Math.ceil(count / limit),
    users: result,
  };
  return messages.success("", payload);
}

module.exports = getUsers;
