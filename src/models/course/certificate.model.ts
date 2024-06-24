import { Schema, model, Document } from 'mongoose';
import { IUser } from '../user.model';
import { ICourse } from './course.model';

export interface ICertificate extends Document {
    user: IUser;
    course: ICourse;
    filePath: string;
}

const certificateSchema: Schema<ICertificate> = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        filePath: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const Certificate = model<ICertificate>('Certificate', certificateSchema);

export default Certificate;
