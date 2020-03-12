const express = require("express");
const investmentController = require("./../controller/investmentController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const sharp = require('sharp');
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
var path = require('path');
const Investment = require('../model/investmentModel')
//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));



//IMAGE UPLOAD CONFIGURATION

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../client/public/uploads/'));
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// Image saved on memmory for image porcessing
const storage = multer.memoryStorage();



// const imageFilter = function (req, file, cb) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
//         return cb(new Error("Only image files are accepted!"), false);
//     }
//     cb(null, true);
// };
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

//!file.originalname.match(/\.(jpg|jpeg|png)$/i)



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

router.route("/").post(upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {

    const { project, amount, currency, date, convAmt, image, } = req.body;
    try {
        const newInvestment = new Investment({
            project, amount, currency, date, convAmt,
            user: req.user.id,
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

router.route("/:id").patch(upload.single("image"), resizeReciptPhoto, catchAsync(async (req, res, next) => {

    const { project, amount, currency, date, convAmt, image, } = req.body;

    const doc = await Investment.findByIdAndUpdate(req.params.id, {
        project, amount, currency, date, convAmt,
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
    .get(investmentController.getUserInvestments)

router
    .route("/getAll")
    .get(investmentController.getAllInvestments)
router
    .route("/getOverAllSum")
    .get(investmentController.getOverAllSumInvestments)

router
    .route("/total/:id")
    .get(investmentController.getTotalInvestments)

router
    .route("/Usertotal/:id")
    .get(investmentController.getUsersTotalInvestments)
router
    .route("/filter/:id")
    .get(investmentController.getFilteredInvestments)
router
    .route("/:id")
    .get(investmentController.getInvestment)
    .delete(investmentController.deleteInvestment)
// .patch(investmentController.updateInvestment);
module.exports = router;