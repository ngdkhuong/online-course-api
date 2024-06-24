import { Schema, model, Document } from 'mongoose';
import { ILesson } from './lesson.model';
import { ICourse } from './course.model';

export interface IChapter extends Document {
    title: string;
    course: ICourse;
    lessons: ILesson[];
}

const chapterSchema: Schema<IChapter> = new Schema(
    {
        title: { type: String, required: true },
        lessons: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lesson',
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const Chapter = model<IChapter>('Chapter', chapterSchema);
