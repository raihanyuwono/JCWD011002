const path = require("path");
const db = require("../../database");
const jwt = require("jsonwebtoken");
const { messages, mailer } = require("../../helpers");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const FE_URL = process.env.WHITELIST;
const JWT_KEY = process.env.JWT_KEY;

const users = db["user"];
const carts = db["cart"];
const roles = db["role"];

const MESSAGE_SUCCESS = "Please check your email to complete the registration";

async function createCart(user, t) {
  await carts.create({ id_user: user["id"] }, { transaction: t });
}

async function sendMail(email, payload) {
  const subject = "Complete your registration";
  // Create token
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "4h" });
  const redirect = `${FE_URL}/registration/${token}`;
  // Send Mail
  await mailer.send(email, subject, { redirect });
}

async function register(email, id_role) {
  // Check if email is exsist
  const isExist = await users.findOne({ where: { email } });
  if (isExist) return messages.error(500, "Email is already exist");
  // Create new user
  await db.sequelize.transaction(async function (t) {
    const user = await users.create({ email, role }, { transaction: t });
    // check role
    const role = await roles.findOne({ where: { id: id_role } });
    if (role["name"] == "user") await createCart(user, t);
    // Send email to verify
    await sendMail(email, { id: user["id"] });
    // Send response after finsihed register
    return messages.success(MESSAGE_SUCCESS);
  });
}

module.exports = register;
