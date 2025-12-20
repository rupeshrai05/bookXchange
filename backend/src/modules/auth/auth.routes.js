const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/verify-email/:token", controller.verifyEmail);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password/:token", controller.resetPassword);

module.exports = router;
