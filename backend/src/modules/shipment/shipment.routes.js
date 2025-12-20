const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const controller = require("./shipment.controller");

router.get("/:exchangeId", auth, controller.getShipments);
router.post("/:exchangeId", auth, controller.createOrUpdateShipment);
router.post("/:shipmentId/delivered", auth, controller.markDelivered);

module.exports = router;
