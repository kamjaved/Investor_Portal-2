const CustomerPay = require("../model/customerPayModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");

//exports.createCustomerPay = factory.createOne(CustomerPay);
exports.getAllCustomerPays = factory.getAll(CustomerPay);
exports.getCustomerPay = factory.getOne(CustomerPay);
exports.updateCustomerPay = factory.updateOne(CustomerPay);
exports.deleteCustomerPay = factory.deleteOne(CustomerPay);



//Get CustomerPay
exports.getUserCustomerPays = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        CustomerPay.find({ user: req.user.id }),
        req.query
    )
        .sort()
        .paginate();
    const docs = await features.query;
    res.status(200).json({
        status: "success",
        result: docs.length,
        data: docs
    });
});


// Post CustomerPay

exports.createCustomerPay = catchAsync(async (req, res, next) => {
    const { project, customer, invoiceNo, amount, currency, convAmt, date, } = req.body;
    try {
        const newCustomerPay = new CustomerPay({
            project, customer, invoiceNo, amount, currency, convAmt, date,
            user: req.user.id
        });

        const doc = await newCustomerPay.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        res.status(500).send(err);
    }

})