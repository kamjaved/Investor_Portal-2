const UPI = require("../model/paybyUPI");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");

//exports.createUPI = factory.createOne(UPI);
exports.getAllUPIs = factory.getAll(UPI);
exports.getUPI = factory.getOne(UPI);
exports.updateUPI = factory.updateOne(UPI);
//exports.deleteUPI = factory.deleteOne(UPI);


exports.deleteUPI = catchAsync(async (req, res, next) => {
    const doc = await UPI.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null
    });
});

//Get Users UPI
exports.getUserUPIs = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        UPI.find({ user: req.user.id }),
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
