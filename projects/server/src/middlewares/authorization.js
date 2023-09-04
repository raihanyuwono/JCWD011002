const db = require("../database");

const users = db["user"];
const roles = db["role"];

async function getRole(id) {
  const role = await roles.findOne({ where: { id_user: id } });
  return role["name"];
}

async function authorization(req, res, next) {
  // For checking user role
  // Block user
  // Pass admin - Checking role level
  try {
    const { account } = req;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = authorization;
