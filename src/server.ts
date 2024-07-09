import mongoose from 'mongoose';
import { config } from './config/config';
import { logError, logInfo, logSuccess } from './middleware/logger';
import app from './app';

mongoose
    .connect(config.MONGO_URI, {
        retryWrites: true,
        w: 'majority',
    })
    .then(() => {
        logSuccess('Connected to MongoDB');

        app.listen(config.SERVER_PORT, () => {
            logInfo(`Server is listening port: ${config.SERVER_PORT}`);
        });
    })
    .catch((err: any) => {
        logError(err);
    });
