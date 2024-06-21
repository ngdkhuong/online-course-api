// lesson.model.ts
import { Schema, model, Document } from 'mongoose';
import { IVideo } from './video.model';
import { IQuiz } from './quiz.model';

export interface ILesson extends Document {
    title: string;
    videos: IVideo[];
    quiz?: IQuiz[];
}

const lessonSchema = new Schema({
    title: { type: String, required: true },
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
    quiz: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
});

export const LessonModel = model<ILesson>('Lesson', lessonSchema);
