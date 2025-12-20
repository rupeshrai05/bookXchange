const service = require("./chat.service");

exports.getMessages = async (req, res) => {
  try {
    const messages = await service.getMessages(
      req.user._id,
      req.params.exchangeId
    );
    res.json(messages);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const msg = await service.sendMessage(
      req.user._id,
      req.params.exchangeId,
      req.body.message
    );
    res.status(201).json(msg);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
