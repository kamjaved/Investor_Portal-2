const express = require("express");
const investmentController = require("./../controller/investmentController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");

//const pdf = require('html-pdf');
//const invmonthPdf = require('../documentPDF/investMonth.js');

const sharp = require('sharp');
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
var path = require('path');
const Investment = require('../model/investmentModel')

//Restrict all router after this middleware to admin only- Authorization

router
    .route("/getAll")
    .get(investmentController.getAllInvestments)
router
    .route("/total/:id")
    .get(authController.restrictTo('admin', 'user'), investmentController.getTotalInvestments)

router
    .route("/Usertotal/:id")
    .get(authController.restrictTo('admin', 'user'), investmentController.getUsersTotalInvestments)
router
    .route("/monthTotal/:year")
    .get(authController.restrictTo('admin', 'user'), investmentController.getMonthInvestments)
router
    .route("/usermonthTotal/:year/:id")
    .get(authController.restrictTo('admin', 'user'), investmentController.getUserMonthInvestments)
router
    .route("/filter/:id")
    .get(authController.restrictTo('admin', 'user'), investmentController.getFilteredInvestments)

router
    .route("/getOverAllSum")
    .get(investmentController.getOverAllSumInvestments)

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

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
        cb(null, true);

    }
});


const resizeReciptPhoto = (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `InvRecipt-${Date.now()}.jpeg`;

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



// Post Investment

router.route("/").post(authController.restrictTo('admin'), upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {

    const { amount, investor, date, image, } = req.body;
    try {
        const newInvestment = new Investment({
            amount, date, investor,
            user: req.user.id,
            username: req.user.username,
            image: req.file ? req.file.filename : image,

        });

        const doc = newInvestment.save();
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

// Update Investment

router.route("/:id").patch(authController.restrictTo('admin'), upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {

    const { amount, investor, currency, date, image, } = req.body;

    const doc = await Investment.findByIdAndUpdate(req.params.id, {
        amount, currency, date, investor,
        new: true,
        runValidators: true,
        user: req.user.id,
        username: req.user.username,
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




//Restrict all router after this middleware to admin only- Authorization
router
    .route("/")
    .get(authController.restrictTo('admin'), investmentController.getUserInvestments)

router
    .route("/:id")
    .get(authController.restrictTo('admin'), investmentController.getInvestment)
    .delete(authController.restrictTo('admin'), investmentController.deleteInvestment)




module.exports = router;