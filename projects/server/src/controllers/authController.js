const { messages } = require("../helpers");
const { authService } = require("../services");

async function register(req, res) {
  try {
    const { email, role } = req.body;
    const result = await authService.register(email, role);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function registration(req, res) {
  try {
    const { id } = req.account;
    const attributes = req.body;
    const result = await authService.registration(id, attributes);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { identifier, password } = req.body;
    const result = await authService.login(identifier, password);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function keepLogin(req, res) {
  try {
    const { id } = req.account;
    const result = await authService.keepLogin(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  registration,
  login,
  keepLogin,
};
