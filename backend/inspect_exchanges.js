const mongoose = require("mongoose");
require("dotenv").config();
const Exchange = require("./src/modules/exchange/exchange.model");
const User = require("./src/models/user.model");
const Book = require("./src/modules/book/book.model");

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Connected to DB");

    const exchanges = await Exchange.find()
        .populate("requester owner", "name email")
        .populate("requestedBook offeredBook", "title");

    console.log("\n--- Exchanges ---");
    exchanges.forEach(e => {
        console.log(`ID: ${e._id}`);
        console.log(`Status: ${e.status}`);
        console.log(`Requester: ${e.requester?.name} (${e.requester?._id})`);
        console.log(`Owner: ${e.owner?.name} (${e.owner?._id})`);
        console.log(`Requested: ${e.requestedBook?.title}`);
        console.log(`Offered: ${e.offeredBook?.title}`);
        console.log("-------------------");
    });

    process.exit();
});
