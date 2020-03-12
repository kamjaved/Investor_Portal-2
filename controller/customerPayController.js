const CustomerPay = require("../model/customerPayModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");
const ObjectId = require('mongodb').ObjectID

//exports.createCustomerPay = factory.createOne(CustomerPay);
exports.getAllCustomerPays = factory.getAll(CustomerPay);
exports.getCustomerPay = factory.getOne(CustomerPay);
exports.updateCustomerPay = factory.updateOne(CustomerPay);
exports.deleteCustomerPay = factory.deleteOne(CustomerPay);



//Get User Wise CustomerPay
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

// Get Sum of Over-All Customer Paymnet
exports.getOverAllSumCustomerPay = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(

        CustomerPay.aggregate([

            {
                $group: {
                    _id: null,
                    totalCustPay: { $sum: "$convAmt" },
                }
            },
        ]),
        req.query
    )
        .paginate()

    const docs = await features.query;
    res.status(200).json({
        status: "success",
        result: docs.length,
        data: docs
    });
});


// Post Add CustomerPay

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


//Get Project Based  Filtered Customer Payment
exports.getFilteredCustPay = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        CustomerPay.find({ project: req.params.id }),
        req.query
    )
        .filter()
        .sort()
        .paginate();
    const docs = await features.query;
    res.status(200).json({
        status: "success",
        result: docs.length,
        data: docs
    });
});


//Get Project Based Total Customer Payment
exports.getTotalCustPay = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        CustomerPay.aggregate([

            {
                $match: {
                    project: new ObjectId(req.params.id)
                },
            },
            {
                $group: {
                    _id: '$project',
                    no_of_investment: {
                        $sum: 1
                    },
                    totalAmount: { $sum: "$convAmt" },
                    project: {
                        $push: '$project'
                    },

                },
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: "project",
                    foreignField: "_id",
                    "as": 'projects_docs'
                },

            },

        ]),

        req.query
    )

        .sort()
        .paginate()

    const docs = await features.query;
    res.status(200).json({

        status: "success",
        result: docs.length,
        data: docs
    });
});



//Get Customet Based Total  Payment
exports.getCustomerTotalPay = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        CustomerPay.aggregate([

            {
                $match: {
                    customer: new ObjectId(req.params.id)
                },
            },

            {
                $group: {
                    _id: '$customer',
                    no_of_investment: {
                        $sum: 1
                    },
                    totalAmount: { $sum: "$convAmt" },

                },
            },
        ]),

        req.query
    )

        .sort()
        .paginate()

    const docs = await features.query;
    res.status(200).json({

        status: "success",
        result: docs.length,
        data: docs
    });
});