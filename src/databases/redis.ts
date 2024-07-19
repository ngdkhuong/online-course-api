import { createClient } from 'redis';
import { REDIS_HOST, REDIS_PASS, REDIS_PORT } from '../config';
import logger from '@utils/logger';

export const redisClient = createClient({
    password: REDIS_PASS,
    socket: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT),
    },
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        logger.info('Connected to Redis');
    } catch (error) {
        logger.error('Error connecting to Redis:', error);
        process.exit(1);
    }
};
