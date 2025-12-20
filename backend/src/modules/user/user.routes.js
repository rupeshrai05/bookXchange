const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const controller = require("./user.controller");

router.get("/me", auth, controller.getProfile);
router.put("/me", auth, controller.updateProfile);

module.exports = router;
