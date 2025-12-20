const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    exchange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exchange",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["user", "system"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
