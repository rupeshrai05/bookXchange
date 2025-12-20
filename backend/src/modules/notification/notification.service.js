const Notification = require("./notification.model");
const { getIO } = require("../../config/socket");

exports.sendNotification = async ({ user, type, message, referenceId }) => {
  const notification = await Notification.create({
    user,
    type,
    message,
    referenceId,
  });

  // 🔔 real-time emit
  const io = getIO();
  io.to(user.toString()).emit("notification", notification);

  return notification;
};

exports.getUserNotifications = async (userId) => {
  return await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });
};

exports.markAsRead = async (userId, id) => {
  const notif = await Notification.findOne({
    _id: id,
    user: userId,
  });

  if (!notif) throw new Error("Notification not found");

  notif.isRead = true;
  await notif.save();

  return notif;
};
