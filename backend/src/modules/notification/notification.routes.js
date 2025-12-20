const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const controller = require("./notification.controller");

router.get("/", auth, controller.getMyNotifications);
router.post("/:id/read", auth, controller.markRead);

module.exports = router;
