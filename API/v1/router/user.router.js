const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/forgot-password", controller.forgotPassword);
router.post("/getOTP", controller.getOTP);
router.post("/reset-password", controller.resetPassword);
router.get("/detail", authMiddleware.requireAuth, controller.info);

module.exports = router;