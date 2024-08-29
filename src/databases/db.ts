import { logger } from '../utils/logger';
import { MONGO_URI } from '../config';
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        mongoose.connection.useDb('lms');
        logger.info('MongoDB connected');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
