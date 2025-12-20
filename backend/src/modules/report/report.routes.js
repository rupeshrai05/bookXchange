const express = require("express");
const router = express.Router();
const auth = require("../../common/middlewares/auth.middleware");
const adminOnly = require("../admin/admin.middleware");
const controller = require("./report.controller");

// user
router.post("/", auth, controller.createReport);

// admin
router.get("/", auth, adminOnly, controller.getAllReports);
router.patch("/:id/resolve", auth, adminOnly, controller.resolveReport);

module.exports = router;
