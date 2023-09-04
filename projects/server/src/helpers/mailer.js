const fs = require("fs").promises;
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

async function notificationTemp(content) {
  const tempPath = path.resolve(__dirname, "../templates/registration.html");
  console.log(tempPath);
  const template = await fs.readFile(
    path.resolve(__dirname, tempPath),
    "utf-8"
  );
  const tempCompile = handlebars.compile(template);
  const tempResult = tempCompile({
    ...content,
  });
  return tempResult;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function send(email, subject, content) {
  await transporter.sendMail({
    to: email,
    subject,
    html: await notificationTemp(content),
  });
}

module.exports = { send };
