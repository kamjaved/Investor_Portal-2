const WhatsGroup = require("../model/whatsappModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");

//exports.createWhatsGroup = factory.createOne(WhatsGroup);
exports.getAllWhatsGroups = factory.getAll(WhatsGroup);
exports.getWhatsGroup = factory.getOne(WhatsGroup);
exports.updateWhatsGroup = factory.updateOne(WhatsGroup);
exports.deleteWhatsGroup = factory.deleteOne(WhatsGroup);


//Get WhatsGroup
exports.getUserWhatsGroups = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        WhatsGroup.find({ user: req.user.id }),
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

// Post WhatsGroup

exports.createWhatsGroup = catchAsync(async (req, res, next) => {
    const { groupLink, desc } = req.body;
    try {
        const newWhatsGroup = new WhatsGroup({
            groupLink, desc,
            user: req.user.id
        });

        const doc = await newWhatsGroup.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        res.status(500).send(err);
    }

})

// Total WhatsGroup Kit

exports.totalWhatsGroups = catchAsync(async (req, res, next) => {

    const features = await new APIFeatures(

        WhatsGroup.aggregate([

            {
                $group: {
                    _id: null,
                    totalWhatsGroup: { $sum: "$rationKit" },
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

