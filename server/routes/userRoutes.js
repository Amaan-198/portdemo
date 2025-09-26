import express from "express";
import rateLimit from "express-rate-limit";
import { registerUser, authUser } from "../controllers/userController.js";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per 15 minutes
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

// We have commented out the registration route for security
// router.post('/', registerUser);
router.post("/login", loginLimiter, authUser);

export default router;
