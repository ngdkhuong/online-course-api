import mongoose, { ConnectOptions } from 'mongoose';
import { config } from './config';

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.options as ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
