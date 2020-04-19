const Setting = require("../model/settingModal");
const factory = require("./handlerFactory");
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require("../utils/catchAsync");

//exports.createSetting = factory.createOne(Setting);
exports.getAllSettings = factory.getAll(Setting);
exports.getSetting = factory.getOne(Setting);
exports.updateSetting = factory.updateOne(Setting);
exports.deleteSetting = factory.deleteOne(Setting);


// Create or Update Setting
exports.createSetting = catchAsync(async (req, res, next) => {
    const { default_grocery } = req.body;

    const settingFields = {};
    if (default_grocery) settingFields.default_grocery = default_grocery;

    try {
        let setting = await Setting.findOne({ default_grocery: req.params.id });
        if (setting) {
            // Update
            setting = await Setting.findOneAndUpdate(req.params.id, settingFields, {
                new: true
            }
            );
            return res.json(setting);
        }

        // Create
        setting = new Setting(settingFields);
        await setting.save();
        res.json(setting);
    }



    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

