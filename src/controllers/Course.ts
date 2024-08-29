import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Course, { CourseStatus, ICourse, ICourseModel } from '../models/Course';
import Instructor, { IInstructorModel } from '../models/Instructor';
import { getCurrencyCode, getCurrencyRateFromCache } from '../services/course.service';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { UserType } from '../enums/UserType';
import CorporateTrainee from '../models/CorporateTrainee';
import IndividualTrainee from '../models/IndividualTrainee';
// import Enrollment from '../models/Enrollment';

const createCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        instructor: req.body.userId,
    });

    try {
        await course.save();
        return res.status(StatusCodes.CREATED).json({ course });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const adjustCoursePrice = (courses: ICourse[]) => {
    courses.forEach((course) => {
        course.price = course.price;
        course.price = Math.ceil(course.price * 100) / 100;
    });
};

const listAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    const courses = await Course.find({});
    res.json(courses);
};

const listCourses = async (req: Request, res: Response, next: NextFunction) => {
    const searchTerm = req.query.searchTerm as string;

    delete req.query.searchTerm;
    //adjust price in query
    if (req.query.price) {
        const price = JSON.parse(JSON.stringify(req.query.price));
        const minPrice = price['$gte'] ? price['$gte'] : 0;
        const maxPrice = price['$lte'] ? price['$lte'] : 100000;
        req.query.price = { $gte: minPrice, $lte: maxPrice } as any;
    }
    if (searchTerm) {
        // search by instructor
        // try to find instructor by name
        // @ts-ignore
        await Instructor.fuzzySearch(searchTerm).then((instructors) => {
            if (instructors.length > 0) {
                // if instructor found, search by instructor
                return searchWithInstructors(instructors, req, res);
            } else {
                return searchWithTitleSubject(searchTerm, req, res);
            }
        });
    } else {
        return listCoursesOnlyFilter(req, res);
    }
};

async function searchWithInstructors(
    instructors: IInstructorModel[],
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    skipPublishCheck: boolean = false,
) {
    return Course.find({
        instructor: { $in: instructors.map((instructor) => instructor._id) },
        ...req.query,
    })
        .populate('instructor', 'firstName lastName')
        .populate('ratings')
        .populate({
            path: 'lessons',
            populate: {
                path: 'exercises',
                model: 'Exercise',
            },
        })
        .populate({
            path: 'activePromotion',
            select: 'name discountPercent startDate endDate source',
            match: { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } },
        })
        .then((courses) => {
            if (!skipPublishCheck) {
                courses = courses.filter((course) => course.status === CourseStatus.PUBLISHED);
            }
            adjustCoursePrice(courses);
        });
}

async function searchWithTitleSubject(
    searchTerm: string,
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    skipPublishCheck: boolean = false,
) {
    return Course.fuzzySearch(searchTerm, req.query)
        .populate('instructor', 'firstName lastName')
        .populate('ratings')
        .populate({
            path: 'lessons',
            populate: {
                path: 'exercises',
                model: 'Exercise',
            },
        })
        .populate({
            path: 'activePromotion',
            select: 'name discountPercent startDate endDate source',
            match: { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } },
        })
        .then((courses) => {
            if (!skipPublishCheck) {
                courses = courses.filter((course) => course.status === CourseStatus.PUBLISHED);
            }
            adjustCoursePrice(courses);
            const coursesWithCurrency = courses.map((course) => ({ ...course.toObject({ virtuals: true }) }));
            res.status(StatusCodes.OK).json({ courses: coursesWithCurrency });
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
}

async function listCoursesOnlyFilter(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    skipPublishCheck: boolean = false,
) {
    let sortOptions = {};
    if (req.query.sort) {
        if (req.query.sort === 'popularity') {
            sortOptions = { enrollmentsCount: -1 };
        } else if (req.query.sort === 'new') {
            sortOptions = { createdAt: -1 };
        }
    }

    return Course.find(req.query)
        .populate('instructor', 'firstName lastName')
        .populate('ratings')
        .populate({
            path: 'lessons',
            populate: {
                path: 'exercises',
                model: 'Exercise',
            },
        })
        .populate({
            path: 'activePromotion',
            select: 'name discountPercent startDate endDate source',
            match: { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } },
        })
        .sort(sortOptions)
        .then((courses) => {
            if (!skipPublishCheck) {
                courses = courses.filter((course) => course.status === CourseStatus.PUBLISHED);
            }
            adjustCoursePrice(courses);
            const coursesWithCurrency = courses.map((course: ICourseModel) => {
                return { ...course.toObject({ virtuals: true }) };
            });
            res.status(StatusCodes.OK).json({ courses: coursesWithCurrency });
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
}

// const listMyCourses = (req, res) => {};

const readCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    const userId = req.body.userId;

    return Course.findById(courseId)
        .populate('instructor', 'firstName lastName')
        .populate('ratings')
        .populate({
            path: 'lessons',
            populate: {
                path: 'exercises',
                model: 'Exercise',
            },
        })
        .populate({
            path: 'activePromotion',
            select: 'name discountPercent startDate endDate source',
            match: { startDate: { $lte: new Date() }, endDate: { $gte: new Date() } },
        })
        .then((course) => {
            if (course) {
                course.price = course.price;
                const isOwner = userId && userId === course.instructor._id.toString();
                res.status(StatusCodes.OK).json({
                    course: { ...course.toObject({ virtuals: true }), isOwner },
                });
            } else {
                res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const updateCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findById(courseId)
        .then((course) => {
            if (course) {
                if (course.status !== CourseStatus.DRAFT) {
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'course is not draft' });
                }

                course.set(req.body);

                return course
                    .save()
                    .then((course) => res.status(StatusCodes.CREATED).json({ course }))
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;

    return Course.findByIdAndDelete(courseId)
        .then((course) => {
            if (course) {
                if (course.status !== CourseStatus.DRAFT) {
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'course is not draft' });
                }
                return res.status(StatusCodes.OK).json({ message: 'Course is deleted Successfully' });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'Course Not found' });
            }
        })

        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const listSubjects = async (_req: Request, res: Response, _next: NextFunction) => {
    const subjects = await Course.distinct('subject');
    return res.status(StatusCodes.OK).json({ subjects });
};

const closeCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    return Course.findById(courseId).then((course) => {
        course?.close().then((_course) => {
            res.status(StatusCodes.OK).json({ message: 'Course closed successfully' });
        });
    });
};

const publishCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    return Course.findById(courseId).then((course) => {
        course?.publish().then((_course) => {
            res.status(StatusCodes.OK).json({ message: 'Course published successfully' });
        });
    });
};

const reOpenCourse = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.params.courseId;
    return Course.findById(courseId).then((course) => {
        course?.reOpen().then((_course) => {
            res.status(StatusCodes.OK).json({ message: 'Course re-opened successfully' });
        });
    });
};

export default {
    createCourse,
    listCourses,
    updateCourse,
    deleteCourse,
    listSubjects,
    readCourse,
    publishCourse,
    closeCourse,
    reOpenCourse,
    listAllCourses,
};
