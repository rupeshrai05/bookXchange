const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./src/models/user.model");

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Connected to DB");

    const result = await User.updateMany(
        { isEmailVerified: false },
        { $set: { isEmailVerified: true } }
    );

    console.log(`Verified ${result.modifiedCount} users.`);
    process.exit();
});
