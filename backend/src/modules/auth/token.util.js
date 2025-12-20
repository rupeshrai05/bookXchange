const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.generateEmailToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
