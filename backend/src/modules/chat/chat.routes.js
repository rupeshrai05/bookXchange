const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const controller = require("./chat.controller");

router.get("/:exchangeId", auth, controller.getMessages);
router.post("/:exchangeId", auth, controller.sendMessage);

module.exports = router;
