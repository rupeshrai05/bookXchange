const app = require("../src/app");
const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("MongoDB Connected (Serverless)");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    }
};

module.exports = async (req, res) => {
    await connectDB();
    return app(req, res);
};
