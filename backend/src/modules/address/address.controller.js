const service = require("./address.service");

exports.addAddress = async (req, res) => {
  try {
    const address = await service.addAddress(req.user._id, req.body);
    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAddresses = async (req, res) => {
  const addresses = await service.getUserAddresses(req.user._id);
  res.json(addresses);
};

exports.updateAddress = async (req, res) => {
  try {
    const address = await service.updateAddress(
      req.user._id,
      req.params.id,
      req.body
    );
    res.json(address);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await service.deleteAddress(req.user._id, req.params.id);
    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
