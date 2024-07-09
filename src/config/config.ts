import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;

const ORIGIN_PORT = process.env.ORIGIN_PORT || 'http://localhost:3000';

export const config = {
    MONGO_URI,
    SERVER_PORT,
    ORIGIN_PORT,
};
