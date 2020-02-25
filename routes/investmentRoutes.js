const express = require("express");
const investmentController = require("./../controller/investmentController");
const authController = require("./../controller/authController");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const multer = require("multer");
const cloudinary = require("cloudinary");
const catchAsync = require("../utils/catchAsync");
const router = express.Router({ mergeParams: true });
var path = require('path');

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));



//IMAGE UPLOAD CONFIGURATION
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../client/public/uploads/'));
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });


// Post Investment

router.route("/").post(upload.single("image"), catchAsync(async (req, res, next) => {


    const { project, amount, currency, date, convAmt, } = req.body;
    try {
        const newInvestment = new Investment({
            project, amount, currency, date, convAmt,
            user: req.user.id,
            image: req.file.filename,

        });

        const doc = newInvestment.save();
        res.status(200).json({
            status: "success",
            doc
        });
    } catch (err) {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.status(401).send(err);
            }
        }
        //res.status(500).send(err);
    }

}));


router
    .route("/")
    .get(investmentController.getUserInvestments)

router
    .route("/getAll")
    .get(investmentController.getAllInvestments)

router
    .route("/total/:id")
    .get(investmentController.getTotalInvestments)
router
    .route("/filter/:id")
    .get(investmentController.getFilteredInvestments)
router
    .route("/:id")
    .get(investmentController.getInvestment)
    .delete(investmentController.deleteInvestment)
    .patch(investmentController.updateInvestment);
module.exports = router;
