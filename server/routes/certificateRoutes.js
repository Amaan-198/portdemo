import express from "express";
import { body } from "express-validator";
import {
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  reorderCertificates,
} from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const certificateValidationRules = [
  body("title").notEmpty().trim().escape(),
  body("issuer").notEmpty().trim().escape(),
  body("url").isURL(),
];

router
  .route("/")
  .get(getCertificates)
  .post(protect, certificateValidationRules, createCertificate);

router.route("/reorder").put(protect, reorderCertificates);

router
  .route("/:id")
  .get(getCertificateById)
  .put(protect, certificateValidationRules, updateCertificate)
  .delete(protect, deleteCertificate);

export default router;
