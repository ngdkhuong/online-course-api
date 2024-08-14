import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import IndividualTrainee from '@models/individualTrainee.model';

const createIndividualTrainee = async (req: Request, res: Response, next: NextFunction) => {
    const individualTrainee = new IndividualTrainee({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
    });

    return individualTrainee
        .save()
        .then((individualTrainee) => res.status(StatusCodes.CREATED).json({ individualTrainee }))
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

export default { createIndividualTrainee };
