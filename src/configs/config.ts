import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
    NODE_ENV,
    PORT,
    MONGO_URI,
    SECRET_KEY,
    LOG_DIR,
    ORIGIN,
    EXCHANGE_BASE_URL,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET,
    CLIENT_URL,
    COMPANY_LOGO,
    COMPANY_NAME,
    COMPANY_ADDRESS,
    COMPANY_PHONE,
    COMPANY_EMAIL,
    COMPANY_WEBSITE,
    COMPANY_FACEBOOK,
    COMPANY_TWITTER,
    COMPANY_INSTAGRAM,
    COMPANY_YOUTUBE,
    COMPANY_LINKEDIN,
    COMPANY_GITHUB,
    COMPANY_GOOGLE_PLAY,
    COMPANY_APP_STORE,
    EMAIL_SERVICE,
    SENDER_MAIL,
    SENDER_PASSWORD,
    STRIPE_PRIVATE_KEY,
} = process.env;
