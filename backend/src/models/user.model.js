const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },

    isEmailVerified: { type: Boolean, default: true },
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    resetPasswordToken: String,
    resetPasswordExpires: Date,

    role: { type: String, enum: ["user", "admin"], default: "user" },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
