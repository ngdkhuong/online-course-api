import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Instructor from '../models/Instructor';

const createInstructor = async (req: Request, res: Response, next: NextFunction) => {
    const instructor = new Instructor({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
    });

    return instructor
        .save()
        .then((instructor) => res.status(StatusCodes.CREATED).json({ instructor }))
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

export default { createInstructor };
