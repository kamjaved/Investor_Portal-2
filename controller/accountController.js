const Account = require("../model/paybyAccnt");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");

//exports.createAccount = factory.createOne(Account);
exports.getAllAccounts = factory.getAll(Account);
exports.getAccount = factory.getOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);


//Get Account
exports.getUserAccounts = catchAsync(async (req, res, next) => {
    const features = await new APIFeatures(
        Account.find({ user: req.user.id }),
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

// Post Account

exports.createAccount = catchAsync(async (req, res, next) => {
    const { accountName, accountNo, ifsc, bankName, bankBranch } = req.body;
    try {
        const newAccount = new Account({
            accountName, accountNo, ifsc, bankName, bankBranch,
            user: req.user.id
        });

        const doc = await newAccount.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        res.status(500).send(err);
    }

})


