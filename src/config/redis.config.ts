import { Redis } from 'ioredis';
require('dotenv').config();

// ? kết nối redis cần lấy link sửa redis ==> rediss
// ? => k bị mắc lỗi disconnect redis
const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log(`Redis Connected`);
        return process.env.REDIS_URL;
    }

    throw new Error('Redis connection failed');
};

export const redis = new Redis(redisClient());
