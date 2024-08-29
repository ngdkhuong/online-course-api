import mongoose, { Document } from 'mongoose';
import Course, { ICourseModel } from './Course';
import Lesson from './Lesson';

// import createCertificate from '../services/certificateService';
import IndividualTrainee from './IndividualTrainee';
import { sendCertificateEmail } from '../services/emails/sendCertificateEmail';
import CorporateTrainee from './CorporateTrainee';
import Instructor from './Instructor';
import { sendEnrollmentEmail } from '../services/emails/sendEnrollmentEmail';
// import Settlement from './Settlement';
// import { getCoursePriceAfterPromotion } from '../services/CourseServices';

interface IExerciseStatus {
    exerciseId: mongoose.Types.ObjectId;
    isCompleted: boolean;
}

export const exerciseStatusSchema = new mongoose.Schema({
    exerciseId: {
        type: mongoose.Types.ObjectId,
        ref: 'Exercise',
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

interface ILessonStatus {
    lessonId: mongoose.Types.ObjectId;
    isVideoWatched: boolean;
    exercisesStatus: Array<IExerciseStatus>;
}

export const lessonStatusSchema = new mongoose.Schema({
    lessonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    isVideoWatched: {
        type: Boolean,
        default: false,
    },
    exercisesStatus: [
        {
            type: exerciseStatusSchema,
            required: true,
            default: [],
        },
    ],
});

export interface IEnrollment {
    courseId: mongoose.Types.ObjectId;
    traineeId: mongoose.Types.ObjectId;
    lessons: Array<ILessonStatus>;
    progress: number;

    setCompletedExercise(lessonId: mongoose.Types.ObjectId, exerciseId: mongoose.Types.ObjectId): void;
}

export interface IEnrollmentModel extends IEnrollment, Document {}

export const enrollmentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    traineeId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    lessons: [
        {
            type: lessonStatusSchema,
            required: true,
            default: [],
        },
    ],
    progress: {
        type: Number,
        default: 0,
    },
});

enrollmentSchema.virtual('IndividualTrainee', {
    ref: 'IndividualTrainee',
    localField: 'traineeId',
    foreignField: '_id',
    justOne: true,
});

enrollmentSchema.virtual('CorporateTrainee', {
    ref: 'CorporateTrainee',
    localField: 'traineeId',
    foreignField: '_id',
    justOne: true,
});

enrollmentSchema.methods.setCompletedExercise = async function (
    lessonId: mongoose.Types.ObjectId,
    exerciseId: mongoose.Types.ObjectId,
) {
    for (const lesson of this.lessons) {
        if (lesson.lessonId.toString() === lessonId.toString()) {
            for (const exercise of lesson.exercisesStatus) {
                if (exerciseId.toString() == exercise.exerciseId.toString()) {
                    exercise.isCompleted = true;
                }
            }
        }
    }

    await this.save();
};

enrollmentSchema.pre<IEnrollmentModel>('save', async function (next) {
    const course = await Course.findById(this.courseId).populate('lessons');

    if (this.isNew) {
        if (!course) {
            return next();
        }

        for (const lessonId of course.lessons) {
            const lesson = await Lesson.findById(lessonId).populate('exercises');
            if (lesson) {
                const lessonStatus: ILessonStatus = {
                    lessonId: lessonId,
                    isVideoWatched: false,
                    exercisesStatus: [],
                }; // Create lesson status

                for (const exerciseId of lesson.exercises) {
                    const exerciseStatus: IExerciseStatus = {
                        exerciseId: exerciseId,
                        isCompleted: false,
                    };
                    lessonStatus.exercisesStatus.push(exerciseStatus);
                } // Create exercise status

                this.lessons.push(lessonStatus); // Add lesson status to enrollment
            }
        }
    } else {
        let totalElements = this.lessons.length;
        for (const lesson of this.lessons) {
            totalElements += lesson.exercisesStatus.length;
        }

        let totalWatchedVideos = 0;
        let totalCompletedExercises = 0;
        for (const lesson of this.lessons) {
            if (lesson.isVideoWatched) {
                totalWatchedVideos++;
            }

            for (const exercise of lesson.exercisesStatus) {
                if (exercise.isCompleted) {
                    totalCompletedExercises++;
                }
            }
        }

        this.progress = Math.round(((totalWatchedVideos + totalCompletedExercises) / totalElements) * 100); // Calculate progress
    }

    next();
});

enrollmentSchema.pre<IEnrollmentModel>('save', async function (next) {
    this.$locals.wasNew = this.isNew; // save the isNew state for the post save hook

    if (!this.isNew) {
        return next();
    }
});

export default mongoose.model<IEnrollmentModel>('Enrollment', enrollmentSchema);
