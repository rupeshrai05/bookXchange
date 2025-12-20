const service = require("./shipment.service");

exports.getShipments = async (req, res) => {
  try {
    const data = await service.getShipments(
      req.user._id,
      req.params.exchangeId
    );
    res.json(data);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

exports.createOrUpdateShipment = async (req, res) => {
  try {
    const shipment = await service.createOrUpdateShipment(
      req.user._id,
      req.params.exchangeId,
      req.body
    );
    res.json(shipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.markDelivered = async (req, res) => {
  try {
    const shipment = await service.markDelivered(
      req.user._id,
      req.params.shipmentId
    );
    res.json(shipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
