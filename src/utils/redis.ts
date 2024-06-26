import { Redis } from 'ioredis';
import { config } from '../config/config';

// ? kết nối redis cần lấy link sửa redis ==> rediss
// ? => k bị mắc lỗi disconnect redis
const redisClient = () => {
    if (config.redis.url) {
        console.log(`Redis Connected`);
        return config.redis.url;
    }

    throw new Error('Redis connection failed');
};

export const redis = new Redis(redisClient());
