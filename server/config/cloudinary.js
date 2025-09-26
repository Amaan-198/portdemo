import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("✅ Cloudinary Core SDK configured.");

// We are now exporting the configured cloudinary object itself, and a basic multer instance
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export { cloudinary, upload };
