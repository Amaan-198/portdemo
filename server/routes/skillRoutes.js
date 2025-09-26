import express from "express";
import { body } from "express-validator";
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
} from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const skillValidationRules = [
  body("title").notEmpty().trim().escape(),
  body("skills").isArray({ min: 1 }),
  body("skills.*").notEmpty().trim().escape(),
];

router
  .route("/")
  .get(getSkills)
  .post(protect, skillValidationRules, createSkill);

router.route("/reorder").put(protect, reorderSkills);

router
  .route("/:id")
  .get(protect, getSkillById)
  .put(protect, skillValidationRules, updateSkill)
  .delete(protect, deleteSkill);

export default router;
