const Investment = require("../model/investmentModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");
const ObjectId = require('mongodb').ObjectID

//exports.createInvestment = factory.createOne(Investment);
exports.getAllInvestments = factory.getAll(Investment);
exports.getInvestment = factory.getOne(Investment);
exports.updateInvestment = factory.updateOne(Investment);
//exports.deleteInvestment = factory.deleteOne(Investment);


exports.deleteInvestment = catchAsync(async (req, res, next) => {
    const doc = await Investment.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null
    });
});

//Get Investment
exports.getUserInvestments = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        Investment.find({ user: req.user.id }),
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


//Get Filtered Investment
exports.getFilteredInvestments = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        Investment.find({ project: req.params.id }),
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

//Get Total Investment
exports.getTotalInvestments = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        Investment.aggregate([

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

