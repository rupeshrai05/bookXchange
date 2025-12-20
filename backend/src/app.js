const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const authMiddleware = require("./common/middlewares/auth.middleware");

const userRoutes = require("./modules/user/user.routes");
const addressRoutes = require("./modules/address/address.routes");
const bookRoutes = require("./modules/book/book.routes");
const exchangeRoutes = require("./modules/exchange/exchange.routes");
const chatRoutes = require("./modules/chat/chat.routes");
const shipmentRoutes = require("./modules/shipment/shipment.routes");
const notificationRoutes = require("./modules/notification/notification.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const reportRoutes = require("./modules/report/report.routes");

const app = express();
app.use(cors({
  origin: "*",
  credentials: false
}));
app.use(express.json());

// Serve static uploads for local dev
app.use("/uploads", express.static("uploads"));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/exchanges", exchangeRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);


app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
