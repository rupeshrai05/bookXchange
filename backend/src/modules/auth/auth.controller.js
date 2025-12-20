const authService = require("./auth.service");

exports.register = async (req, res) => {
  try {
    const data = await authService.registerUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const data = await authService.verifyEmail(req.params.token);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const data = await authService.forgotPassword(req.body.email);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const data = await authService.resetPassword(
      req.params.token,
      req.body.password
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
