import { Types } from 'mongoose';

export interface ICertificate {
    _id?: string;
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    issueDate: Date;
}
