// review.model.ts
import { Schema, model, Document } from 'mongoose';
import { IUser } from '../user.model';
import { ICourse } from './course.model';

export interface IReview extends Document {
    user: IUser;
    course: ICourse;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const reviewSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    },
    { timestamps: true },
);

export const ReviewModel = model<IReview>('Review', reviewSchema);
