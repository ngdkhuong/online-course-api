import dotenv from 'dotenv';

// Load .env file
dotenv.config();

// Access the environment variables
export const {
    NODE_ENV = 'development',
    PORT = '3000',
    MONGO_URI = 'mongodb://localhost:27017/mydatabase',
    REDIS_URL = 'redis://localhost:6379',
    JWT_ACCESS_TOKEN_SECRET = 'access_token_secret',
    JWT_REFRESH_TOKEN_SECRET = 'refresh_token_secret',
    SMTP_HOST = 'smtp.mailtrap.io',
    SMTP_PORT = '2525',
    SMTP_SERVICE = 'mailtrap',
    SMTP_MAIL = 'your_email@example.com',
    SMTP_PASSWORD = 'your_password',
    CLOUDINARY_CLOUD_NAME = 'your_cloud_name',
    CLOUDINARY_API_KEY = 'your_api_key',
    CLOUDINARY_API_SECRET = 'your_api_secret',
    GOOGLE_CLIENT_ID = 'your_client_id',
    GOOGLE_CLIENT_SECRET = 'your_client_secret',
    GITHUB_CLIENT_ID = 'your_client_id',
    GITHUB_CLIENT_SECRET = 'your_client_secret',
    ORIGIN = 'http://localhost:3000',
} = process.env;
