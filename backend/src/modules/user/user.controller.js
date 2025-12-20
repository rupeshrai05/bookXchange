const userService = require("./user.service");

exports.getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUser(req.user._id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
