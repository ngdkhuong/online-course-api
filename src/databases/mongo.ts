import mongoose from 'mongoose';
import { MONGO_URI } from '../config';
import logger from '@utils/logger';

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
