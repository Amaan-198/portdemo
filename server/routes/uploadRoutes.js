import express from "express";
import { upload, cloudinary } from "../config/cloudinary.js"; // Import both
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.array("images", 5), // Use the multer instance for initial handling
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error("Please upload at least one file.");
    }

    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "portfolio_uploads",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        stream.end(file.buffer);
      });
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      res.status(201).json(uploadedUrls);
    } catch (error) {
      res.status(500);
      throw new Error("Image upload to Cloudinary failed.");
    }
  })
);

export default router;
