import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 8000,
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your-app-name',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        },
    },
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'your-access-token-secret',
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'your-refresh-token-secret',
    },
    email: {
        from: process.env.EMAIL_FROM || 'your-email@example.com',
        smtp: {
            host: process.env.SMTP_HOST || 'smtp.example.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            username: process.env.SMTP_USERNAME || 'your-smtp-username',
            password: process.env.SMTP_PASSWORD || 'your-smtp-password',
        },
    },
    redis: {
        url: process.env.REDIS_URL || 'your-redis-url',
    },
};
