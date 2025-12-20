const service = require("./notification.service");

exports.getMyNotifications = async (req, res) => {
  const notifications = await service.getUserNotifications(req.user._id);
  res.json(notifications);
};

exports.markRead = async (req, res) => {
  try {
    const notif = await service.markAsRead(req.user._id, req.params.id);
    res.json(notif);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
