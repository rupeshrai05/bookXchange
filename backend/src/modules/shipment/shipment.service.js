const Shipment = require("./shipment.model");
const Exchange = require("../exchange/exchange.model");
const Address = require("../address/address.model");

exports.getShipments = async (userId, exchangeId) => {
  const exchange = await Exchange.findById(exchangeId);
  if (!exchange) throw new Error("Exchange not found");

  if (!exchange.requester.equals(userId) && !exchange.owner.equals(userId)) {
    throw new Error("Unauthorized");
  }

  if (
    exchange.status !== "accepted" &&
    exchange.status !== "shipped" &&
    exchange.status !== "completed"
  )
    throw new Error("Shipment not available yet");

  const shipments = await Shipment.find({ exchange: exchangeId })
    .populate("sender receiver", "name")
    .lean();

  // 🔓 ADDRESS REVEAL HERE
  const addresses = await Address.find({
    user: { $in: [exchange.requester, exchange.owner] },
  });

  return {
    shipments,
    addresses,
  };
};

exports.createOrUpdateShipment = async (userId, exchangeId, data) => {
  const exchange = await Exchange.findById(exchangeId);
  if (!exchange) throw new Error("Exchange not found");

  if (
    exchange.status !== "accepted" &&
    exchange.status !== "shipped" &&
    exchange.status !== "completed"
  )
    throw new Error("Exchange not active");

  const receiver = exchange.requester.equals(userId)
    ? exchange.owner
    : exchange.requester;

  let shipment = await Shipment.findOne({
    exchange: exchangeId,
    sender: userId,
  });

  if (!shipment) {
    shipment = await Shipment.create({
      exchange: exchangeId,
      sender: userId,
      receiver,
    });
  }

  Object.assign(shipment, data);
  shipment.status = "shipped";
  await shipment.save();

  exchange.status = "shipped";
  await exchange.save();

  return shipment;
};

exports.markDelivered = async (userId, shipmentId) => {
  const shipment = await Shipment.findById(shipmentId);
  if (!shipment) throw new Error("Shipment not found");

  if (!shipment.receiver.equals(userId))
    throw new Error("Only receiver can confirm delivery");

  shipment.status = "delivered";
  await shipment.save();

  const allDelivered = await Shipment.countDocuments({
    exchange: shipment.exchange,
    status: { $ne: "delivered" },
  });

  if (allDelivered === 0) {
    await Exchange.findByIdAndUpdate(shipment.exchange, {
      status: "completed",
    });
  }

  return shipment;
};
