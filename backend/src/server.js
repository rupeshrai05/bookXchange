require("dotenv").config();
const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { initSocket } = require("./config/socket");

mongoose.connect(process.env.MONGO_URI).then(() => {
  const server = http.createServer(app);

  initSocket(server);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
});
