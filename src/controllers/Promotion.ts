import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Promotion from '../models/Promotion';
import Course from '../models/Course';

const listPromotions = (req: Request, res: Response, next: NextFunction) => {
    return Promotion.find()
        .populate('courses')
        .then((promotions) => res.status(StatusCodes.OK).json({ promotions }))
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const getPromotion = (req: Request, res: Response, next: NextFunction) => {
    const promotionId = req.params.promotionId;

    return Promotion.findById(promotionId)
        .populate('courses')
        .then((promotion) =>
            promotion
                ? res.status(StatusCodes.OK).json({ promotion })
                : res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' }),
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

function addPromotionToCourse(courseId: mongoose.Types.ObjectId, promotionId: mongoose.Types.ObjectId) {
    return new Promise((resolve, reject) => {
        Course.findById(courseId)
            .then(async (course) => {
                if (!course) {
                    reject(new Error('Course not found'));
                    return;
                }
                if (course.activePromotion) {
                    await Promotion.findByIdAndDelete(course.activePromotion).catch((error) => reject(error));
                }
                course.activePromotion = promotionId;
                course
                    .save()
                    .then(() => resolve('success'))
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });
}

const createPromotion = async (req: Request, res: Response, next: NextFunction) => {
    const promotion = new Promotion({
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
    });

    return promotion
        .save()
        .then(async (promotion) => {
            Promise.all(
                promotion.courses.map((courseId) =>
                    addPromotionToCourse(courseId, promotion._id as mongoose.Types.ObjectId),
                ),
            )
                .then(() => {
                    res.status(StatusCodes.CREATED).json({ promotion });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
                });
        })
        .catch((error) => {
            console.log(error.message);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        });
};

const updatePromotion = (req: Request, res: Response, next: NextFunction) => {
    const promotionId = req.params.promotionId;

    return Promotion.findById(promotionId)
        .then((promotion) => {
            if (promotion) {
                promotion.set(req.body);

                return promotion
                    .save()
                    .then((promotion) => res.status(StatusCodes.CREATED).json({ promotion }))
                    .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deletePromotion = async (req: Request, res: Response, next: NextFunction) => {
    const promotionId = req.params.promotionId;

    return Promotion.findByIdAndDelete(promotionId)
        .then((promotion) =>
            promotion
                ? res.status(StatusCodes.OK).json({ message: 'Promotion Deleted' })
                : res.status(StatusCodes.NOT_FOUND).json({ message: 'Promotion Not Found' }),
        )
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

export default {
    createPromotion,
    listPromotions,
    getPromotion,
    updatePromotion,
    deletePromotion,
};
