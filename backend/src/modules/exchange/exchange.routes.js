const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const controller = require("./exchange.controller");

// 🔴 STATIC ROUTES FIRST
router.get("/mine", auth, controller.getMyExchanges);

// 🔴 DYNAMIC ROUTES AFTER
router.get("/:id", auth, controller.getExchangeById);
router.post("/", auth, controller.requestExchange);
router.post("/:id/accept", auth, controller.acceptExchange);
router.post("/:id/reject", auth, controller.rejectExchange);

module.exports = router;
