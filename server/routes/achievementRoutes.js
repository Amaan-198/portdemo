import express from "express";
import { body } from "express-validator";
import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  reorderAchievements,
} from "../controllers/achievementController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const achievementValidationRules = [
  body("title").notEmpty().trim().escape(),
  body("description").notEmpty().trim().escape(),
];

router
  .route("/")
  .get(getAchievements)
  .post(protect, achievementValidationRules, createAchievement);

router.route("/reorder").put(protect, reorderAchievements);

router
  .route("/:id")
  .get(getAchievementById)
  .put(protect, achievementValidationRules, updateAchievement)
  .delete(protect, deleteAchievement);

export default router;
