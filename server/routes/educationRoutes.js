import express from "express";
import { body } from "express-validator";
import {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
  reorderEducation,
} from "../controllers/educationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const educationValidationRules = [
  body("degree").notEmpty().trim().escape(),
  body("institution").notEmpty().trim().escape(),
  body("dates").notEmpty().trim().escape(),
  body("cgpa").notEmpty().trim().escape(),
];

router
  .route("/")
  .get(getEducation) // Public
  .post(protect, educationValidationRules, createEducation);

router.route("/reorder").put(protect, reorderEducation);

router
  .route("/:id")
  .get(protect, getEducationById)
  .put(protect, educationValidationRules, updateEducation)
  .delete(protect, deleteEducation);

export default router;
