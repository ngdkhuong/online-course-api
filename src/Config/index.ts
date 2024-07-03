import { config } from 'dotenv';
config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const { MONGO_URI } = process.env;
