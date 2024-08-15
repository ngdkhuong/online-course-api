import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import CorporateTrainee from '../models/CorporateTrainee';

const createCorporateTrainee = async (req: Request, res: Response, next: NextFunction) => {
    const corporateTrainee = new CorporateTrainee({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
    });

    return corporateTrainee
        .save()
        .then((corporateTrainee) => res.status(StatusCodes.CREATED).json({ corporateTrainee }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const listCorporateTrainees = async (req: Request, res: Response, next: NextFunction) => {
    return (
        CorporateTrainee.find()
            // .populate('courses')
            .then((corporateTrainees) => res.status(StatusCodes.OK).json({ corporateTrainees }))
            .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }))
    );
};

export default { createCorporateTrainee, listCorporateTrainees };
