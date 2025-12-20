const Book = require("./book.model");

exports.addBook = async (userId, data) => {
  return await Book.create({ ...data, owner: userId });
};

exports.getUserBooks = async (userId) => {
  return await Book.find({ owner: userId });
};

exports.getAllBooks = async () => {
  return await Book.find({ status: "available" }).populate("owner", "name");
};

exports.getBookById = async (id) => {
  return await Book.findById(id).populate("owner", "name");
};

exports.updateBook = async (userId, bookId, data, images) => {
  const book = await Book.findOne({ _id: bookId, owner: userId });
  if (!book) throw new Error("Book not found or unauthorized");
  if (book.status !== "available") throw new Error("Book cannot be modified");

  Object.assign(book, data);
  if (images?.length) book.images = images;

  return await book.save();
};

exports.deleteBook = async (userId, bookId) => {
  const book = await Book.findOne({ _id: bookId, owner: userId });
  if (!book) throw new Error("Book not found or unauthorized");
  if (book.status !== "available") throw new Error("Book cannot be deleted");

  await book.deleteOne();
};
