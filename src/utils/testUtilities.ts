import mongoose from 'mongoose';
import dotenv from 'dotenv';

async function connectDBForTesting() {
    try {
        dotenv.config();
        const dbUri = process.env.MONGO_TEST_URL || '';
        const dbName = 'test';
        await mongoose.connect(dbUri, {
            dbName,
            autoCreate: true,
        });
        // destroy all data in the database
        await mongoose.connection.db.dropDatabase();
    } catch (error) {
        console.log('DB connect error');
        process.exit(1);
    }
}

async function disconnectDBForTesting() {
    try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    } catch (error) {
        console.log('DB disconnect error');
        process.exit(1);
    }
}

const TIME_OUT = 10000;

export { connectDBForTesting, disconnectDBForTesting, TIME_OUT };
