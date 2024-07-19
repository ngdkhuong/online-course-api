import { ILesson } from './lesson.interface';

// Define the ISection interface
export interface ISection {
    _id?: string;
    title: string;
    lessons: ILesson[];
}

// Define the IQuiz interface
export interface IQuiz {
    _id?: string;
    title: string;
    questions: IQuestion[];
}

// Define the IQuestion interface
export interface IQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

// Define the IReview interface
export interface IReview {
    _id?: string;
    studentId: string;
    rating: number;
    comment: string;
    date: Date;
}

// Define the ICourse interface
export interface ICourse {
    _id?: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: number; // Duration in minutes
    comments: string[];
    rating: number;
    author: string;
    instructor: string;
    type: CourseType;
    qualification: CourseQualification;
    sections: ISection[];
    quizzes: IQuiz[];
    enrolledStudents: number;
    reviews: IReview[];
    numberOfSections: number;
    totalNumberOfLessons: number;
}

// Define the CourseType enum
export enum CourseType {
    Free = 'Free',
    Paid = 'Paid',
}

// Define the CourseQualification enum
export enum CourseQualification {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
}
