import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserType } from '../enums/UserType';
import CorporateTrainee from '../models/CorporateTrainee';
import IndividualTrainee from '../models/IndividualTrainee';
import Instructor from '../models/Instructor';
import mongoose from 'mongoose';

const getProfileById = async (Model: mongoose.Model<any>, userId: mongoose.Types.ObjectId, res: Response) => {
    const profile = await Model.findById(userId);

    if (!profile) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: `${Model.modelName} not found`,
        });
    }

    return res.status(StatusCodes.OK).json({
        [Model.modelName.toLowerCase()]: profile,
    });
};

const readProfile = async (req: Request, res: Response, _next: NextFunction) => {
    const { userType, userId } = req.body;

    // Định nghĩa kiểu của mapping
    const mapping = {
        [UserType.INSTRUCTOR]: Instructor,
        [UserType.INDIVIDUAL_TRAINEE]: IndividualTrainee,
        [UserType.CORPORATE_TRAINEE]: CorporateTrainee,
    };

    // Đảm bảo userType thuộc kiểu keyof typeof mapping
    if (!(userType in mapping)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Invalid user type',
        });
    }

    const Model = mapping[userType as keyof typeof mapping];

    return getProfileById(Model, userId, res);
};

export default {
    readProfile,
};
