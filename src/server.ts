import { NODE_ENV, PORT } from './config';
import { connectRedis } from './databases/redis';
import { connectDB } from './databases/db';
import { logger } from 'utils/logger';
import app from './app';

(async function startServer() {
    try {
        connectDB();
        connectRedis();

        app.listen(PORT, () => {
            logger.info('___________________________');
            logger.info(` App is running in ${NODE_ENV} mode`);
            logger.info(` App listening on the port ${PORT}`);
        });
    } catch (error) {
        logger.error('Error starting server:', error);
        process.exit(1);
    }
})();
