const Exchange = require("./exchange.model");
const Book = require("../book/book.model");
const { sendNotification } = require("../notification/notification.service");

exports.requestExchange = async (userId, data) => {
  const requestedBook = await Book.findById(data.requestedBook);
  const offeredBook = await Book.findById(data.offeredBook);

  if (!requestedBook || !offeredBook) throw new Error("Book not found");

  if (requestedBook.owner.equals(userId))
    throw new Error("Cannot request your own book");

  if (requestedBook.status !== "available")
    throw new Error("Book not available");

  const existing = await Exchange.findOne({
    requester: userId,
    requestedBook: data.requestedBook,
    status: "requested",
  });

  if (existing) {
    throw new Error("Exchange request already sent");
  }

  const exchange = await Exchange.create({
    requester: userId,
    owner: requestedBook.owner,
    requestedBook: data.requestedBook,
    offeredBook: data.offeredBook,
    cashAmount: data.cashAmount || 0,
  });

  await sendNotification({
    user: requestedBook.owner,
    type: "exchange_request",
    message: "You received a new exchange request",
    referenceId: exchange._id,
  });
  return exchange;
};

exports.getUserExchanges = async (userId) => {
  return await Exchange.find({
    $or: [{ requester: userId }, { owner: userId }],
  })
    .populate("requestedBook offeredBook")
    .populate("requester owner", "name");
};

exports.acceptExchange = async (userId, exchangeId) => {
  const exchange = await Exchange.findById(exchangeId);
  if (!exchange) throw new Error("Exchange not found");

  if (exchange.status !== "requested") {
    throw new Error("Exchange already processed");
  }

  if (!exchange.owner.equals(userId)) {
    throw new Error("Unauthorized");
  }

  exchange.status = "accepted";
  await exchange.save();

  await Book.findByIdAndUpdate(exchange.requestedBook, {
    status: "locked",
  });

  await Book.findByIdAndUpdate(exchange.offeredBook, {
    status: "locked",
  });

  await sendNotification({
    user: exchange.requester,
    type: "exchange_accepted",
    message: "Your exchange request was accepted",
    referenceId: exchange._id,
  });

  return exchange;
};

exports.rejectExchange = async (userId, exchangeId) => {
  const exchange = await Exchange.findById(exchangeId);
  if (!exchange) throw new Error("Exchange not found");

  if (exchange.status !== "requested") {
    throw new Error("Exchange already processed");
  }

  if (!exchange.owner.equals(userId)) {
    throw new Error("Unauthorized");
  }

  exchange.status = "rejected";
  await exchange.save();

  await sendNotification({
    user: exchange.requester,
    type: "exchange_rejected",
    message: "Your exchange request was rejected",
    referenceId: exchange._id,
  });

  return exchange;
};

// Get exchange by id with authorization (owner or requester)
exports.getExchangeById = async (userId, exchangeId) => {
  const exchange = await Exchange.findById(exchangeId)
    .populate("requestedBook offeredBook")
    .populate("requester owner", "name");

  if (!exchange) throw new Error("Exchange not found");

  const isParticipant =
    (exchange.requester && exchange.requester._id
      ? exchange.requester._id.toString() === userId.toString()
      : exchange.requester.toString() === userId.toString()) ||
    (exchange.owner && exchange.owner._id
      ? exchange.owner._id.toString() === userId.toString()
      : exchange.owner.toString() === userId.toString());

  if (!isParticipant) throw new Error("Unauthorized");

  return exchange;
};
