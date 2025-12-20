const User = require("../../models/user.model");
const Book = require("../book/book.model");
const Exchange = require("../exchange/exchange.model");

exports.getAllUsers = async () => {
  return await User.find().select("-passwordHash");
};

exports.banUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.isBanned = true;
  await user.save();

  return user;
};

exports.getAllBooks = async () => {
  return await Book.find().populate("owner", "name email");
};

exports.deleteBook = async (bookId) => {
  const book = await Book.findById(bookId);
  if (!book) throw new Error("Book not found");

  if (book.status === "locked") {
    throw new Error("Cannot delete book in active exchange");
  }

  await book.deleteOne();
};

exports.getAllExchanges = async () => {
  return await Exchange.find()
    .populate("requester owner", "name email")
    .populate("requestedBook offeredBook");
};
