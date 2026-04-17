const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
router.post("/register", controller.register);
// router.get("/detail/:id", controller.detail);
// router.patch("/change-status/:id", controller.changeStatus);
// router.patch("/change-multi-status", controller.changeMultiStatus);
// router.post("/create", controller.create);
// router.patch("/edit/:id", controller.edit);
// router.delete("/delete/:id", controller.delete);

module.exports = router;