import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


try {
  const result = await cloudinary.uploader.upload(
    "https://res.cloudinary.com/deik4jy3h/image/upload/v1772032686/1_3_sstte2.webp", 
    { public_id: "test_connection_esm" }
  );
  
  console.log("✅ Connection Successful!");
  console.log("URL:", result.secure_url);
} catch (error) {
  console.error("❌ Connection Failed:", error.message);
}