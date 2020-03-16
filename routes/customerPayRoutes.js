const express = require("express");
const customerPayController = require("./../controller/customerPayController.js");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));

router
    .route("/")
    .get(customerPayController.getUserCustomerPays)
    .post(customerPayController.createCustomerPay);


router
    .route("/getAll")
    .get(customerPayController.getAllCustomerPays)
router
    .route("/getOverAllSum")
    .get(customerPayController.getOverAllSumCustomerPay)
router
    .route("/total/:id")
    .get(customerPayController.getTotalCustPay)

router
    .route("/monthTotal/:year")
    .get(customerPayController.getMonthCustomerPays)
router
    .route("/usermonthTotal/:year/:id")
    .get(customerPayController.getMonthUserCustPay)

router
    .route("/filter/:id")
    .get(customerPayController.getFilteredCustPay)

router
    .route("/custTotal/:id")
    .get(customerPayController.getCustomerTotalPay)
router
    .route("/:id")
    .get(customerPayController.getCustomerPay)
    .patch(customerPayController.updateCustomerPay)
    .delete(customerPayController.deleteCustomerPay);

module.exports = router;
