const Ration = require("../model/rationkit");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");

//exports.createRation = factory.createOne(Ration);
exports.getAllRations = factory.getAll(Ration);
exports.getRation = factory.getOne(Ration);
exports.updateRation = factory.updateOne(Ration);
exports.deleteRation = factory.deleteOne(Ration);


//Get Ration
exports.getUserRations = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        Ration.find({ user: req.user.id }),
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

// Post Ration

exports.createRation = catchAsync(async (req, res, next) => {
    const { rationKit, desc, date, } = req.body;
    try {
        const newRation = new Ration({
            rationKit, date, desc,
            user: req.user.id
        });

        const doc = await newRation.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        res.status(500).send(err);
    }

})

// Total Ration Kit

exports.totalRations = catchAsync(async (req, res, next) => {

    const features = await new APIFeatures(

        Ration.aggregate([

            {
                $group: {
                    _id: null,
                    totalRation: { $sum: "$rationKit" },
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

