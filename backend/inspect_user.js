const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./src/models/user.model");

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Connected to DB");

    const email = "sarveshjain@gmail.com";
    const user = await User.findOne({ email });

    if (!user) {
        console.log(`User ${email} NOT FOUND.`);
    } else {
        console.log(`User detected:`);
        console.log(`- Email: ${user.email}`);
        console.log(`- Verified: ${user.isEmailVerified}`);
        console.log(`- Role: ${user.role}`);

        // Force verify if not verified
        if (!user.isEmailVerified) {
            user.isEmailVerified = true;
            await user.save();
            console.log(`-> Updated user to VERIFIED.`);
        }
    }

    process.exit();
});
