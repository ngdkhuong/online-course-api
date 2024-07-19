import { Types } from 'mongoose';
import { ICourse } from './course.interface';

export interface ILesson {
    _id?: string;
    courseId: Types.ObjectId | ICourse;
    title: string;
    content: string;
}
