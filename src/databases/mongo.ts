import mongoose from 'mongoose';
import { MONGO_URI } from '../config';
import logger from '../utils/logger';

export const connectMongoDB = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(MONGO_URI);
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
