// quiz.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IQuiz extends Document {
    question: string;
    options: string[];
    answer: number;
}

const quizSchema = new Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    answer: { type: Number, required: true },
});

export const QuizModel = model<IQuiz>('Quiz', quizSchema);
