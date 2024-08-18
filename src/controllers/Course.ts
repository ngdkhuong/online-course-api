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

// async function getCurrencyRateByCookie(
//     req: Request,
//     baseCountry: string,
// ): Promise<{ currencyRate: number; currency: any }> {
//     const country: string = req.cookies.country || 'us';
//     const currency: string = await getCurrencyCode(country);
//     const baseCurrency: string = await getCurrencyCode(baseCountry);
//     const currencyRate: number = await getCurrencyRateFromCache(currency, baseCurrency);
//     return { currencyRate, currency };
// }

const createCourse = async (req: Request, res: Response, _next: NextFunction) => {
    // const { currencyRate }: { currencyRate: number; currency: any } = await getCurrencyRateByCookie(req, 'us');

    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        instructor: req.body.userId,
    });
    // course.price = course.price / currencyRate;

    try {
        await course.save();
        return res.status(StatusCodes.CREATED).json({ course });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const listCourses = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const courses = await Course.find({ status: CourseStatus.PUBLISHED });
        return res.status(StatusCodes.OK).json({ courses });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export default {
    createCourse,
    listCourses,
};
