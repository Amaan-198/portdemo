import express from "express";
import { body } from "express-validator";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  reorderProjects,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const projectValidationRules = [
  body("title").notEmpty().withMessage("Title is required").trim().escape(),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .trim()
    .escape(),
  body("description").notEmpty().trim().escape(),
  body("extendedDescription").notEmpty().trim().escape(),
  body("imageUrls")
    .isArray({ min: 1 })
    .withMessage("At least one image is required."),
  body("imageUrls.*").isURL().withMessage("Each image must be a valid URL."),
  body("badge").optional().trim().escape(),
  body("githubUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),
  body("liveUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Live Demo URL must be a valid URL"),
];

router
  .route("/")
  .get(getProjects) // Public
  .post(protect, projectValidationRules, createProject);

router.route("/reorder").put(protect, reorderProjects);

router
  .route("/:id")
  .get(getProjectById)
  .put(protect, projectValidationRules, updateProject)
  .delete(protect, deleteProject);

export default router;
