const User = require("../../models/user.model");

exports.updateUser = async (userId, data) => {
  const allowed = ["name"];
  const updates = {};

  allowed.forEach((field) => {
    if (data[field]) updates[field] = data[field];
  });

  return await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-passwordHash");
};
