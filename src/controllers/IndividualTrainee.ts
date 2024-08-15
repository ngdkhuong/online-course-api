import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import IndividualTrainee from '../models/IndividualTrainee';

const createIndividualTrainee = async (req: Request, res: Response) => {
    const individualTrainee = new IndividualTrainee({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
    });

    return individualTrainee
        .save()
        .then((individualTrainee) => res.status(StatusCodes.CREATED).json({ individualTrainee }))
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const listIndividualTrainees = async (req: Request, res: Response, next: NextFunction) => {
    return (
        IndividualTrainee.find()
            // .populate('courses')
            .then((individualTrainees) => res.status(StatusCodes.OK).json({ individualTrainees }))
            .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }))
    );
};

export default { createIndividualTrainee, listIndividualTrainees };
