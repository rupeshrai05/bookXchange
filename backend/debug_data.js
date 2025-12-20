const mongoose = require("mongoose");
require("dotenv").config();
const Book = require("./src/modules/book/book.model");
const User = require("./src/models/user.model");

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log("Connected to DB");

    const books = await Book.find().populate("owner", "name email");
    const users = await User.find();

    console.log("\n--- Users ---");
    users.forEach(u => console.log(`${u.name} (${u.email}) - ${u._id}`));

    console.log("\n--- Books ---");
    books.forEach(b => console.log(`Title: ${b.title}, Owner: ${b.owner?.name} (${b.owner?.email}) [${b.owner?._id}], Status: ${b.status}, ID: ${b._id}`));

    process.exit();
});
