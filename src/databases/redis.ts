import { logger } from 'utils/logger';
import { REDIS_HOST, REDIS_PASS, REDIS_PORT } from '../config/index';
import { createClient } from 'redis';

export const client = createClient({
    password: REDIS_PASS,
    socket: {
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT ?? '6379'), // Provide a default value if REDIS_PORT is undefined
    },
});

export const connectRedis = () => {
    client
        .connect()
        .then(() => logger.info('Connected to Redis'))
        .catch((error) => logger.error('Error connecting to Redis:', error));
    return client;
};
