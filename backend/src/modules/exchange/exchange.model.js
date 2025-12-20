const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestedBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    offeredBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    cashAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "requested",
        "accepted",
        "rejected",
        "shipped",
        "delivered",
        "completed",
      ],
      default: "requested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exchange", exchangeSchema);
