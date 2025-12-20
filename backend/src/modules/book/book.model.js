const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    condition: {
      type: String,
      enum: ["new", "like-new", "used", "old"],
      required: true,
    },
    images: {
      type: [String],
      validate: [(arr) => arr.length > 0, "At least one image required"],
    },
    exchangeType: {
      type: String,
      enum: ["book", "book+cash"],
      default: "book",
    },
    status: {
      type: String,
      enum: ["available", "locked", "exchanged"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
