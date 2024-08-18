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
    return IndividualTrainee.find()
        .then((individualTrainees) => res.status(StatusCodes.OK).json({ individualTrainees }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const readIndividualTrainee = async (req: Request, res: Response, next: NextFunction) => {
    const { individualTraineeId } = req.params;

    return (
        IndividualTrainee.findById(individualTraineeId)
            // .populate('courses')
            .then((individualTrainee) => res.status(StatusCodes.OK).json({ individualTrainee }))
            .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }))
    );
};

const updateIndividualTrainee = async (req: Request, res: Response, next: NextFunction) => {
    const { individualTraineeId } = req.params;

    return IndividualTrainee.findById(individualTraineeId)
        .then((individualTrainee) => {
            if (individualTrainee) {
                individualTrainee.set(req.body);

                return individualTrainee
                    .save()
                    .then((individualTrainee) => res.status(StatusCodes.CREATED).json({ individualTrainee }))
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteIndividualTrainee = async (req: Request, res: Response, next: NextFunction) => {
    const individualTraineeId = req.params.individualTraineeId;

    return IndividualTrainee.findByIdAndDelete(individualTraineeId)
        .then((individualTrainee) => res.status(StatusCodes.NO_CONTENT).json({ individualTrainee }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default {
    createIndividualTrainee,
    listIndividualTrainees,
    readIndividualTrainee,
    updateIndividualTrainee,
    deleteIndividualTrainee,
};
