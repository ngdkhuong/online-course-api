import mongoose, { Document } from 'mongoose';
import { IUser, UserSchema } from './user.model';

export interface ITrainee extends IUser {
    courses: Array<mongoose.Types.ObjectId>;
    enrollments: Array<mongoose.Types.ObjectId>;
}

export interface ITraineeModel extends ITrainee, Document {}

export class TraineeSchema extends UserSchema {
    constructor(obj: Object, options: Object) {
        super(obj, options);
        this.add({
            courses: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
            enrollments: [{ type: mongoose.Types.ObjectId, ref: 'Enrollment' }],
        }),
            {
                toJSON: {
                    virtuals: true,
                },
            };
    }
} // Set collection option to false

export default TraineeSchema;
