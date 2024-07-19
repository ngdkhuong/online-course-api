import logger from '@utils/logger';
import app from './app';
import { PORT } from './config';
import { connectMongoDB } from '@databases/mongo';
import { connectRedis } from '@databases/redis';

(async function startServer() {
    try {
        await connectMongoDB();
        await connectRedis();

        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Error starting server:', error);
        process.exit(1);
    }
})();
