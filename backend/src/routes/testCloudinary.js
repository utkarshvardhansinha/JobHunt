import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Load .env
dotenv.config({ debug: true, override: true });

// Log what we see
console.log("Checking Cloudinary ENV variables:");
console.log({
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded (hidden)" : "❌ Missing"
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Make a simple ping request to Cloudinary
(async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connected:", result);
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error.message);
  }
})();
