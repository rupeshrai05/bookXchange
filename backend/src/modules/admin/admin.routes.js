const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const adminOnly = require("./admin.middleware");
const controller = require("./admin.controller");

router.get("/users", auth, adminOnly, controller.getAllUsers);
router.patch("/users/:id/ban", auth, adminOnly, controller.banUser);

router.get("/books", auth, adminOnly, controller.getAllBooks);
router.delete("/books/:id", auth, adminOnly, controller.deleteBook);

router.get("/exchanges", auth, adminOnly, controller.getAllExchanges);

module.exports = router;
