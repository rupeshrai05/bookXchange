const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

let io;

exports.initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // later restrict to frontend domain
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.user.name);

    socket.join(socket.user._id.toString());

    socket.on("join-exchange", (exchangeId) => {
      socket.join(exchangeId);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.user.name);
    });
  });


  return io;
};

exports.getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
