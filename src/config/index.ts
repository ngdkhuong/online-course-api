import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Access the environment variables
export const {
    NODE_ENV,
    PORT,
    MONGO_URI,
    REDIS_PASS,
    REDIS_HOST,
    REDIS_PORT,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SERVICE,
    SMTP_MAIL,
    SMTP_PASSWORD,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    ORIGIN,
} = process.env;
