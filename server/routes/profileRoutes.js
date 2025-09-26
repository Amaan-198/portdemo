import express from "express";
import { body } from "express-validator";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const profileValidationRules = [
  body("name").notEmpty().trim().escape(),
  body("headline").notEmpty().trim().escape(),
  body("about").notEmpty().trim().escape(),
  body("profilePhoto").optional({ checkFalsy: true }).isURL(),
  body("resumeUrl").optional({ checkFalsy: true }).isString().trim(),
];

router
  .route("/")
  .get(getProfile) // Public
  .put(protect, profileValidationRules, updateProfile); // Private

export default router;
