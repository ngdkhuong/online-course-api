import { logger } from '../utils/logger';

import Redis from 'ioredis';

const redisClient = () => {
    if (process.env.REDIS_URL) {
        logger.info('Connecting to Redis using URL');
        return process.env.REDIS_URL;
    }

    throw new Error('Redis connection failed');
};

export const redis = new Redis(redisClient());
