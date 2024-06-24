import { Schema, model, Document } from 'mongoose';
import { IChapter } from './chapter.model';
import { IUser } from '../user.model';
import { ICertificate } from './certificate.model';

export interface ICourse extends Document {
    title: string;
    description: string;
    thumbnail: {
        public_id: string;
        url: string;
    };
    price: number;
    isFree: boolean;
    duration: number;
    enrolledStudents: Array<{ userId: string }>;
    reviews: Array<{
        user: IUser;
        rating: number;
        comment: string;
    }>;
    tags: string[];
    categories: string[];
    chapters: IChapter[];
    certificate: ICertificate;
}

const courseSchema: Schema<ICourse> = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter the course name'],
        },
        description: {
            type: String,
            required: [true, 'Please enter the course name'],
        },
        thumbnail: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        isFree: {
            type: Boolean,
            default: false,
        },
        duration: {
            type: Number,
            required: true,
        },
        enrolledStudents: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        reviews: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
        ],
        tags: [
            {
                type: String,
            },
        ],
        categories: [
            {
                type: String,
            },
        ],
        chapters: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Chapter',
            },
        ],
        certificate: {
            type: Schema.Types.ObjectId,
            ref: 'Certificate',
        },
    },
    {
        timestamps: true,
    },
);

const Course = model<ICourse>('Course', courseSchema);

export default Course;
