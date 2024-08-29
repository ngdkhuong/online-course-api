import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Exercise from '../models/Exercise';
import Lesson from '../models/Lesson';
import Answer from '../models/Answer';

const createExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessonId = req.params.lessonId;

        const exercise = new Exercise({
            _id: new mongoose.Types.ObjectId(),
            ...req.body,
        });

        const savedExercise = await exercise.save();

        await Lesson.findByIdAndUpdate(lessonId, { $push: { exercises: savedExercise._id } });

        return res.status(StatusCodes.CREATED).json({ exercise: savedExercise });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};

const listExercises = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exercises = await Exercise.find(req.query);
        return res.status(StatusCodes.OK).json({ exercises });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const readExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseId = req.params.exerciseId;
        const exercise = await Exercise.findById(exerciseId);

        if (exercise) {
            return res.status(StatusCodes.OK).json({ exercise });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const updateExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseId = req.params.exerciseId;
        const exercise = await Exercise.findById(exerciseId);

        if (exercise) {
            exercise.set(req.body);
            const updatedExercise = await exercise.save();
            return res.status(StatusCodes.OK).json({ exercise: updatedExercise });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
        }
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const deleteExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { exerciseId, lessonId } = req.params;

        const exercise = await Exercise.findByIdAndDelete(exerciseId);

        if (exercise) {
            await Lesson.findByIdAndUpdate(lessonId, { $pull: { exercises: exercise._id } });
            return res.status(StatusCodes.OK).json({ message: 'Exercise deleted successfully' });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Exercise not found' });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const evaluateExercise = async (traineeId: mongoose.Types.ObjectId, exerciseId: mongoose.Types.ObjectId) => {
    // Tìm câu trả lời của học viên cho bài tập
    const answerObject = await Answer.findOne({ exerciseId, traineeId });
    const userAnswers = answerObject ? answerObject.answers : [];

    // Tìm bài tập từ database
    const exerciseObject = await Exercise.findById(exerciseId);

    if (exerciseObject && userAnswers.length > 0) {
        const questions = exerciseObject.questions;

        // Đánh giá câu trả lời của học viên
        const results = questions.map((question, index) => {
            const correctAnswer = question.answerIndex;
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === correctAnswer;

            return {
                isCorrect,
                correctAnswer,
                userAnswer,
            };
        });

        // Tính số câu trả lời đúng
        const correctAnswers = results.filter((result) => result.isCorrect).length;
        const totalGrade = (correctAnswers / questions.length) * 100;

        return { totalGrade, results };
    }

    // Trường hợp không tìm thấy bài tập hoặc không có câu trả lời từ học viên
    return { totalGrade: 0, results: [] };
};

const readSubmission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseId = req.params.exerciseId as unknown as mongoose.Types.ObjectId;
        const traineeId = req.body.userId as unknown as mongoose.Types.ObjectId;

        // Tìm câu trả lời của học viên
        const answer = await Answer.findOne({ exerciseId, traineeId });

        if (answer) {
            // Đánh giá bài tập của học viên
            const evaluation = await evaluateExercise(traineeId, exerciseId);
            return res.status(StatusCodes.OK).json({ evaluation });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const submitExercise = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { exerciseId } = req.params as {
            courseId: unknown;
            lessonId: unknown;
            exerciseId: unknown;
        } as {
            courseId: mongoose.Types.ObjectId;
            lessonId: mongoose.Types.ObjectId;
            exerciseId: mongoose.Types.ObjectId;
        };
        const traineeId = req.body.userId;

        // Tìm câu trả lời của học viên cho bài tập
        let answer = await Answer.findOne({ exerciseId, traineeId });

        if (answer) {
            // Cập nhật câu trả lời nếu đã tồn tại
            answer.set({ answers: req.body.answers });
        } else {
            // Tạo mới câu trả lời nếu chưa tồn tại
            answer = new Answer({
                _id: new mongoose.Types.ObjectId(),
                exerciseId,
                traineeId,
                ...req.body,
            });
        }

        // Lưu câu trả lời
        await answer.save();

        // Đánh giá bài tập của học viên
        const evaluation = await evaluateExercise(traineeId, exerciseId);
        return res.status(StatusCodes.CREATED).json({ evaluation });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return res.status(StatusCodes.BAD_REQUEST).json({ error });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export default {
    createExercise,
    listExercises,
    readExercise,
    updateExercise,
    deleteExercise,
    evaluateExercise,
    readSubmission,
    submitExercise,
};
