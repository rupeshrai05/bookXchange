const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
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
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courierName: String,
    trackingNumber: String,
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", shipmentSchema);
