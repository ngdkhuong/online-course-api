import { MONGO_URI } from '@/Config';
import { ConnectOptions } from 'mongoose';

const options: ConnectOptions = {
    autoCreate: true,
    autoIndex: true,
};

export const dbConnection = {
    options,
    url: `${MONGO_URI}`,
};
