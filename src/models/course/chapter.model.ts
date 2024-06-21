// chapter.model.ts
import { Schema, model, Document } from 'mongoose';
import { ILesson } from './lesson.model';

interface IChapter extends Document {
    title: string;
    lessons: ILesson[];
}

const chapterSchema = new Schema({
    title: { type: String, required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
});

export const ChapterModel = model<IChapter>('Chapter', chapterSchema);
