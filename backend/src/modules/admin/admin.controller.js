const service = require("./admin.service");

exports.getAllUsers = async (req, res) => {
  const users = await service.getAllUsers();
  res.json(users);
};

exports.banUser = async (req, res) => {
  try {
    const user = await service.banUser(req.params.id);
    res.json({ message: "User banned", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  const books = await service.getAllBooks();
  res.json(books);
};

exports.deleteBook = async (req, res) => {
  try {
    await service.deleteBook(req.params.id);
    res.json({ message: "Book removed by admin" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllExchanges = async (req, res) => {
  const exchanges = await service.getAllExchanges();
  res.json(exchanges);
};
