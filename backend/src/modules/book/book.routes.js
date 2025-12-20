const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const controller = require("./book.controller");
const multer = require("multer");
const { storage } = require("../../config/cloudinary");

const upload = multer({ storage });

router.post("/", auth, upload.array("images", 5), controller.addBook);

router.get("/mine", auth, controller.getMyBooks);
router.get("/:id", controller.getBookById);
router.get("/", controller.getAllBooks);

router.put("/:id", auth, upload.array("images", 5), controller.updateBook);

router.delete("/:id", auth, controller.deleteBook);

module.exports = router;
