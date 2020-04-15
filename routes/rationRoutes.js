const express = require("express");
const rationController = require("./../controller/rationController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });



router
    .route("/getAll")
    .get(rationController.getAllRations)
router
    .route("/total")
    .get(rationController.totalRations)

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

router
    .route("/")
    .get(authController.restrictTo('admin'), rationController.getAllRations)
    .post(authController.restrictTo('admin'), rationController.createRation);

router
    .route("/:id")
    .get(authController.restrictTo('admin'), rationController.getRation)
    .patch(authController.restrictTo('admin'), rationController.updateRation)
    .delete(authController.restrictTo('admin'), rationController.deleteRation);

module.exports = router;
