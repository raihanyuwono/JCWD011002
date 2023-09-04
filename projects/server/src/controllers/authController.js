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

module.exports = {
  register,
};
