import { Schema, model } from 'mongoose';
import { ILesson } from '../interfaces/lesson.interface';

const lessonSchema = new Schema<ILesson>({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

export default model<ILesson>('Lesson', lessonSchema);
