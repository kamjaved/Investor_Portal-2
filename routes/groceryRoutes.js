const express = require("express");
const groceryController = require("./../controller/GroceryController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });


//Protect all routes after this middleware- Authentication
router.use(authController.protect);

router
    .route("/")
    .get(authController.restrictTo('admin'), groceryController.getAllGrocerys)
    .post(authController.restrictTo('admin'), groceryController.createGrocery);

router
    .route("/:id")
    .get(authController.restrictTo('admin'), groceryController.getGrocery)
    .patch(authController.restrictTo('admin'), groceryController.updateGrocery)
    .delete(authController.restrictTo('admin'), groceryController.deleteGrocery);

module.exports = router;
