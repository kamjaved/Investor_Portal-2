const Grocery = require("../model/GroceryModel");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");

//exports.createGrocery = factory.createOne(Grocery);
exports.getAllGrocerys = factory.getAll(Grocery);
exports.getGrocery = factory.getOne(Grocery);
//exports.updateGrocery = factory.updateOne(Grocery);
exports.deleteGrocery = factory.deleteOne(Grocery);



// Post Grocery
exports.createGrocery = catchAsync(async (req, res, next) => {
    const { groceryKitName, price, items } = req.body;

    // Build profile object
    const groceryFields = {}
    //   activityFields.user = req.user.id;

    if (groceryKitName) groceryFields.groceryKitName = groceryKitName;
    if (price) groceryFields.price = price;
    if (items) {
        groceryFields.items = items
            .toString()
            .split(",")
            .map(itm => itm.trim());
    }
    try {
        // Using upsert option (creates new doc if no match is found):
        let grocery = await Grocery.create(groceryFields);
        res.json(grocery);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
    next();

})


// Edit Grocery
exports.updateGrocery = catchAsync(async (req, res, next) => {
    const { groceryKitName, price, items } = req.body;

    // Build profile object
    const groceryFields = {}
    //   activityFields.user = req.user.id;

    if (groceryKitName) groceryFields.groceryKitName = groceryKitName;
    if (price) groceryFields.price = price;
    if (items) {
        groceryFields.items = items
            .toString()
            .split(",")
            .map(itm => itm.trim());
    }
    try {
        // Using upsert option (creates new doc if no match is found):
        let grocery = await Grocery.findByIdAndUpdate(req.params.id, groceryFields, {
            new: true,
            runValidators: true
        });
        res.json(grocery);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
    next();

})

