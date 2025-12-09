import { v2 } from "cloudinary";
const cloudinary = v2;
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Configuration
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;
