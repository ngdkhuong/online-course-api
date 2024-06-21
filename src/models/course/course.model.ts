import mongoose, { Document, Model, Schema } from 'mongoose';
import { ILesson } from './lesson.model';
import { IReview } from './review.model';

export interface ICourse extends Document {
    name: string;
    description: string;
    category: string;
    price: number;
    isFree: boolean;
    duration: number;
    enrolledStudents: Array<{ userId: string }>;
    lessons: ILesson[];
    reviews: IReview[];
    avgRating: number;
    numReviews: number;
}

const courseSchema: Schema<ICourse> = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter the course name'],
        },
        description: {
            type: String,
            required: [true, 'Please enter the course description'],
        },
        price: {
            type: Number,
            required: [true, 'Please enter the course price'],
            min: [0, 'Price must be a positive number'],
        },
        isFree: {
            type: Boolean,
            default: false,
        },
        duration: {
            type: Number,
            required: [true, 'Please enter the course duration in hours'],
            min: [1, 'Duration must be at least 1 hour'],
        },
        category: {
            type: String,
            required: [true, 'Please enter the course category'],
        },
        enrolledStudents: [
            {
                userId: String,
            },
        ],
        lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
        reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
        avgRating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

const courseModel: Model<ICourse> = mongoose.model('Course', courseSchema);

export default courseModel;
