const Chat = require("./chat.model");
const Exchange = require("../exchange/exchange.model");
const { getIO } = require("../../config/socket");
const { sendNotification } = require("../notification/notification.service");


exports.getMessages = async (userId, exchangeId) => {
  const exchange = await Exchange.findById(exchangeId);
  if (!exchange) throw new Error("Exchange not found");

  if (!exchange.requester.equals(userId) && !exchange.owner.equals(userId)) {
    throw new Error("Not authorized for this chat");
  }

  return await Chat.find({ exchange: exchangeId })
    .populate("sender", "name")
    .sort({ createdAt: 1 });
};

exports.sendMessage = async (userId, exchangeId, message) => {
  const exchange = await Exchange.findById(exchangeId);
  if (!exchange) throw new Error("Exchange not found");

  if (exchange.status === "completed" || exchange.status === "rejected") {
    throw new Error("Chat is closed for this exchange");
  }

  if (!message || !message.trim()) {
    throw new Error("Message cannot be empty");
  }

  if (!exchange.requester.equals(userId) && !exchange.owner.equals(userId)) {
    throw new Error("Unauthorized");
  }

  const msg = await Chat.create({
    exchange: exchangeId,
    sender: userId,
    message,
  });

  const populatedMsg = await msg.populate("sender", "name");

  const receiver = exchange.owner.equals(userId)
    ? exchange.requester
    : exchange.owner;

  await sendNotification({
    user: receiver,
    type: "message",
    message: "New message in exchange chat",
    referenceId: exchangeId,
  });

  const io = getIO();
  io.to(exchangeId).emit("new-message", {
    _id: populatedMsg._id,
    exchange: exchangeId,
    sender: populatedMsg.sender,
    message: populatedMsg.message,
    createdAt: populatedMsg.createdAt,
  });

  return populatedMsg;
};

