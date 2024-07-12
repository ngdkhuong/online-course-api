import { dbConnection } from './databases/mongo';
import { connect, connection } from 'mongoose';
import * as http from 'http';
import App from './app';
import { logger } from './utils/logger';
import validateEnv from './utils/validateEnv';
import { PORT } from './configs/config';
// import AuthRoute from '@auth/auth.route';

validateEnv();

try {
    const app = new App();

    (async function connectToDatabase() {
        connect(dbConnection.url)
            .then(() => {
                app.listen();
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
