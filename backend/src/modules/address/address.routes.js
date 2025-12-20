const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const controller = require("./address.controller");

router.post("/", auth, controller.addAddress);
router.get("/", auth, controller.getAddresses);
router.put("/:id", auth, controller.updateAddress);
router.delete("/:id", auth, controller.deleteAddress);

module.exports = router;
