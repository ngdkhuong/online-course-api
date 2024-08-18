import { NODE_ENV, PORT } from './config';
import { connectDB } from './databases/db';
import { logger } from './utils/logger'; // Update the import path
import http from 'http';

import app from './app'; // Import the App class from app.ts
import { connection } from 'mongoose';
import { redis } from './databases/redis';

// import { AuthRoute } from './routes/authRoute'; // Import the missing AuthRoute

(async function startServer() {
    app.listen(PORT, () => {
        // Use the PORT constant instead of app.port
        logger.info(`=================================`);
        logger.info(`======= ENV: ${NODE_ENV} =======`);
        logger.info(`🚀 App listening on the http://localhost:${PORT}`);
        logger.info(`📃 API on the http://localhost:${PORT}/docs`);
        logger.info(`=================================`);
        connectDB();
        redis;
    });

    // Handle database connection events
    connection.on('connecting', () => logger.info('database connecting'));
    connection.on('connected', () => logger.info('database connected'));
    connection.on('disconnecting', () => logger.info('database disconnecting'));
    connection.on('disconnected', () => logger.info('database disconnected'));
    connection.on('error', () => logger.info('database error'));
})();
