const service = require("./exchange.service");

exports.requestExchange = async (req, res) => {
  try {
    const exchange = await service.requestExchange(req.user._id, req.body);
    res.status(201).json(exchange);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyExchanges = async (req, res) => {
  const exchanges = await service.getUserExchanges(req.user._id);
  res.json(exchanges);
};

exports.acceptExchange = async (req, res) => {
  try {
    const exchange = await service.acceptExchange(req.user._id, req.params.id);
    res.json(exchange);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.rejectExchange = async (req, res) => {
  try {
    const exchange = await service.rejectExchange(req.user._id, req.params.id);
    res.json(exchange);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getExchangeById = async (req, res) => {
  try {
    const exchange = await service.getExchangeById(req.user._id, req.params.id);
    res.json(exchange);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
