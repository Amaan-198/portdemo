import express from "express";
import { body } from "express-validator";
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const experienceValidationRules = [
  body("role").notEmpty().trim().escape(),
  body("company").notEmpty().trim().escape(),
  body("dates").notEmpty().trim().escape(),
  body("description").isArray({ min: 1 }),
  body("description.*").notEmpty().trim().escape(),
];

router
  .route("/")
  .get(getExperiences) // Public
  .post(protect, experienceValidationRules, createExperience);

router
  .route("/:id")
  .get(protect, getExperienceById)
  .put(protect, experienceValidationRules, updateExperience)
  .delete(protect, deleteExperience);

export default router;
