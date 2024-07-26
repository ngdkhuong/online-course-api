import { Schema, model } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';

const courseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
});

export default model<ICourse>('Course', courseSchema);
