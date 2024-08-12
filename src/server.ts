import { PORT } from './config';
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
            logger.info(` App is running in ${process.env.NODE_ENV} mode`);
            logger.info(` App listening on the port ${PORT}`);
            logger.info('___________________________');
        });
    } catch (error) {
        logger.error('Error starting server:', error);
        process.exit(1);
    }
})();
