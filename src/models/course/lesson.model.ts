import { Schema, model, Document } from 'mongoose';
import { IChapter } from './chapter.model';

export interface ILesson extends Document {
    title: string;
    content: string;
    video: {
        public_id: string;
        url: string;
    };
    quiz: {
        question: string;
        options: string[];
        answer: number;
    }[];
    chapter: IChapter;
}

const lessonSchema: Schema<ILesson> = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        video: {
            public_id: { type: String, required: true },
            url: { type: String, required: true },
        },
        quiz: [
            {
                question: { type: String, required: true },
                options: [{ type: String, required: true }],
                answer: { type: Number, required: true },
            },
        ],
        chapter: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    },
    {
        timestamps: true,
    },
);

const Lesson = model<ILesson>('Lesson', lessonSchema);

export default Lesson;
