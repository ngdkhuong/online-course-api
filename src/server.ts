import App from '@/app';
import validateEnv from '@/utils/validateEnv';
import { dbConnection } from '@/databases/mongo';
import { connect, connection } from 'mongoose';
import http from 'http';
import { logger } from '@/utils/logger';

validateEnv();

try {
    const app = new App();

    (async function connectToDatabase() {
        connect(dbConnection.url)
            .then(() => {
                const server = http.createServer(app.app);

                server.listen(app.port, () => {
                    logger.info(`ENV: ${this.env}`);
                    logger.info(`Server run on PORT: http://localhost:${this.port}`);
                });
            })
            .catch((err) => logger.error(`Connection to Database failed: ${err}`));

        connection.on('connecting', () => logger.info('database connecting'));
        connection.on('connected', () => logger.info('database connected'));
        connection.on('disconnecting', () => logger.info('database disconnecting'));
        connection.on('disconnected', () => logger.info('database disconnected'));
        connection.on('error', () => logger.info('database error'));
    })();
} catch (error) {
    console.log(error);
}
