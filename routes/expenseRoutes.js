const express = require("express");
const expenseController = require("./../controller/expenseController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const cloudinary = require("cloudinary");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });


//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));



//IMAGE UPLOAD CONFIGURATION
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return cb(new Error("Only image files are accepted!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 1
    }, fileFilter: imageFilter
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Post Expense

router.route("/").post(upload.single("image"), catchAsync(async (req, res, next) => {


    cloudinary.v2.uploader.upload(req.file.path, function (err, result) {


        const { project, amount, currency, date, purpose, convAmt, } = req.body;
        try {
            const newExpense = new Expense({
                project, amount, currency, date, purpose, convAmt,
                user: req.user.id,
                image: result.secure_url,
                imageId: result.public_id,

            });

            const doc = newExpense.save();
            res.status(200).json({
                status: "success",
                doc
            });
        } catch (err) {
            res.status(500).send(err);
        }
    })
}));

router
    .route("/")
    .get(expenseController.getUserExpenses)

router
    .route("/getAll")
    .get(expenseController.getAllExpenses)

router
    .route("/total/:id")
    .get(expenseController.getTotalExpenses)

router
    .route("/filter/:id")
    .get(expenseController.getFilteredExpenses)

router
    .route("/:id")
    .get(expenseController.getExpense)
    .patch(expenseController.updateExpense)
    .delete(expenseController.deleteExpense);

module.exports = router;
