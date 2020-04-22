const express = require("express");
const contactusController = require("./../controller/ContactUsController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
// router.use(authController.protect);

router
    .route("/")
    .get(contactusController.getAllContactUss)
    .post(contactusController.createContactUs);

router
    .route("/:id")
    .get(contactusController.getContactUs)
    .patch(contactusController.updateContactUs)
    .delete(contactusController.deleteContactUs);

module.exports = router;
