import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Access the environment variables
export const {
    PORT,
    MONGO_URI,
    REDIS_PASS,
    REDIS_HOST,
    REDIS_PORT,
    JWT_SECRET,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
} = process.env;
