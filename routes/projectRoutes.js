const express = require("express");
const projectController = require("./../controller/projectController");
const authController = require("./../controller/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));

router
    .route("/")
    .get(projectController.getAllProjects)
    .post(projectController.createProject);

router
    .route("/getAll")
    .get(projectController.getAllProjects)
router
    .route("/:id")
    .get(projectController.getProject)
    .patch(projectController.updateProject)
    .delete(projectController.deleteProject);

module.exports = router;
