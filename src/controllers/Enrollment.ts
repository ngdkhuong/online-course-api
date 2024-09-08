import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Enrollment from '../models/Enrollment';
import IndividualTrainee from '../models/IndividualTrainee';
import CorporateTrainee from '../models/CorporateTrainee';
import { createEnrollmentService } from '../services/enrollment.service';

const readEnrollment = async (req: Request, res: Response, next: NextFunction) => {
    const { enrollmentId } = req.params;
    const traineeId = req.body.userId;

    try {
        const enrollment = await Enrollment.findById(enrollmentId);

        if (enrollment && enrollment.traineeId.toString() === traineeId) {
            return res.status(StatusCodes.OK).json({ enrollment });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const readMyEnrollments = async (req: Request, res: Response, next: NextFunction) => {
    const traineeId = req.body.userId;
    if (!traineeId) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'trainee not found' });
    }

    req.query.traineeId = traineeId;

    let trainee = (await CorporateTrainee.findById(traineeId)) || (await IndividualTrainee.findById(traineeId));

    if (!trainee) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'trainee not found' });
    }

    req.query['_id'] = { $in: trainee.enrollments.map((enrollment) => enrollment.toString()) };

    try {
        const enrollment = await Enrollment.find(req.query);
        if (enrollment.length > 0) {
            return res.status(StatusCodes.OK).json({ enrollment });
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

const updateEnrollment = async (req: Request, res: Response, next: NextFunction) => {
    const { enrollmentId } = req.params;
    const traineeId = req.body.userId;

    try {
        const enrollment = await Enrollment.findById(enrollmentId);

        if (enrollment && enrollment.traineeId.toString() === traineeId) {
            enrollment.set(req.body);

            const updatedEnrollment = await enrollment.save();
            return res.status(StatusCodes.CREATED).json({ enrollment: updatedEnrollment });
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

const createEnrollment = async (req: Request, res: Response, _next: NextFunction) => {
    const courseId = req.body.courseId as unknown as mongoose.Types.ObjectId;
    const traineeId = req.body.userId as unknown as mongoose.Types.ObjectId;

    createEnrollmentService(traineeId, courseId)
        .then((enrollment) => {
            IndividualTrainee.findById(traineeId).then((trainee) => {
                if (trainee) {
                    trainee.enrollments.push(enrollment._id as mongoose.Types.ObjectId);
                    trainee.save();
                } else {
                    return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
                }
            });

            return res.status(StatusCodes.CREATED).json({ enrollment });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

export default {
    readEnrollment,
    readMyEnrollments,
    updateEnrollment,
    createEnrollment,
};
