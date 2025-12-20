const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const { generateToken, generateEmailToken } = require("./token.util");
const { sendVerificationEmail } = require("../../config/mail");
const { sendResetPasswordEmail } = require("../../config/mail");


// REGISTER
exports.registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const passwordHash = await bcrypt.hash(password, 10);

  // Create user directly verified
  const user = await User.create({
    name,
    email,
    passwordHash,
    isEmailVerified: true
  });

  // Automatically login after register
  return {
    message: "Registration successful.",
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }
  };
};

// LOGIN (this is what was missing)
exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new Error("Invalid credentials");

  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

// VERIFY EMAIL
exports.verifyEmail = async (token) => {
  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};


exports.forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const token = generateEmailToken();

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save();

  await sendResetPasswordEmail(email, token);

  return { message: "Password reset email sent" };
};


exports.resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: "Password reset successful" };
};
