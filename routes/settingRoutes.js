const express = require("express");
const settingController = require("./../controller/settingController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });


//Protect all routes after this middleware- Authentication
router.use(authController.protect);

router
    .route("/")
    .get(authController.restrictTo('admin'), settingController.getAllSettings)
    .post(authController.restrictTo('admin'), settingController.createSetting);

router
    .route("/:id")
    .get(authController.restrictTo('admin'), settingController.getSetting)
    .patch(authController.restrictTo('admin'), settingController.updateSetting)
    .delete(authController.restrictTo('admin'), settingController.deleteSetting);

module.exports = router;
