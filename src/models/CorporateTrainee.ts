import mongoose, { Document, Schema } from 'mongoose';
import TraineeSchema, { ITrainee } from './Trainee';
import User from './User';

const options = { discriminatorKey: 'kind' };

export enum status {
    active = 'ACTIVE',
    expired = 'EXPIRED',
}

export interface ICorporateTrainee extends ITrainee {
    corporate: String;
    status: status;
    expiredAt: Date;
}

// inherit from ITraineeModel
export interface ICorporateTraineeModel extends ICorporateTrainee, Document {}

class CorporateTraineeSchema extends TraineeSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            corporate: { type: String, required: true, trim: true },
            expiredAt: { type: Date, required: true },
        });
        this.virtual('status').get(function () {
            if (this.expiredAt < new Date()) {
                return status.expired;
            }
            return status.active;
        });
    }
}

// TODO create schema for CorporateTrainee model by inheriting from User without create a new schema
const CorporateTrainee: mongoose.Model<ICorporateTraineeModel> = User.discriminator(
    'CorporateTrainee',
    new CorporateTraineeSchema({}, options),
);

export default CorporateTrainee;
