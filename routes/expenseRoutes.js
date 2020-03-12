const express = require("express");
const expenseController = require("./../controller/expenseController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const sharp = require('sharp');
// const cloudinary = require("cloudinary");
var path = require('path');
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
const Expense = require('../model/expenseModel')


//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));



//IMAGE UPLOAD CONFIGURATION
// const storage = multer.diskStorage({
//     filename: function (req, file, callback) {
//         callback(null, Date.now() + file.originalname);
//     }
// });
// const imageFilter = function (req, file, cb) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
//         return cb(new Error("Only image files are accepted!"), false);
//     }
//     cb(null, true);
// };

// Image saved on memmory for image porcessing
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 1
    }, fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            return cb(new Error("Only image files are accepted!"), false);
        }
        // if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        //     req.fileValidationError = "Forbidden extension";
        //     return cb(null, false, req.fileValidationError);
        // }
        cb(null, true);

    }
});


const resizeReciptPhoto = (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `ExpRecipt-${Date.now()}.jpeg`;

    sharp(req.file.buffer)
        .resize(1000, 1000, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(path.join(__dirname, `../public/uploads/${req.file.filename}`));
    next();
}

// Post Expense

router.route("/").post(upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {


    const { project, amount, currency, date, purpose, convAmt, image } = req.body;
    try {
        const newExpense = new Expense({
            project, amount, currency, date, purpose, convAmt,
            user: req.user.id,
            image: req.file ? req.file.filename : image,

        });

        const doc = newExpense.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        if (req.fileValidationError) {
            console.log("Invalid File type Only Image file Accepted");
            return res.status(400).send({
                msg: "Invalid File type Only Image file Accepted",
                success: false
            });

        }
        res.status(500).send(err);
    }

}));



// Update Expense

router.route("/:id").patch(upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {

    const { project, amount, currency, date, convAmt, image, purpose, } = req.body;

    const doc = await Expense.findByIdAndUpdate(req.params.id, {
        project, amount, currency, date, convAmt, purpose,
        new: true,
        runValidators: true,
        user: req.user.id,
        image: req.file ? req.file.filename : image,
    });

    if (!doc) {
        return next(new AppError("No document found with that ID", 404));
    }
    if (req.fileValidationError) {
        console.log("Invalid File type Only Image file Accepted");
        return res.status(400).send({
            msg: "Invalid File type Only Image file Accepted",
            success: false
        });

    }
    res.status(200).json({
        status: "success",
        doc
    });

}))


router
    .route("/")
    .get(expenseController.getUserExpenses)

router
    .route("/getAll")
    .get(expenseController.getAllExpenses)

router
    .route("/getOverAllSum")
    .get(expenseController.getOverAllSumExpenses)

router
    .route("/total/:id")
    .get(expenseController.getTotalExpenses)

router
    .route("/Usertotal/:id")
    .get(expenseController.getUsersTotalExpenses)
router
    .route("/filter/:id")
    .get(expenseController.getFilteredExpenses)

router
    .route("/:id")
    .get(expenseController.getExpense)
    //.patch(expenseController.updateExpense)
    .delete(expenseController.deleteExpense);

module.exports = router;
