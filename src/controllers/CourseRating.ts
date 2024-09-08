import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import Rating, { IRatingModel } from '../models/Rating';
import CorporateTrainee from '../models/CorporateTrainee';
import IndividualTrainee from '../models/IndividualTrainee';
import Course, { ICourse, ICourseModel } from '../models/Course';
import { match } from 'assert';

const createRating = async (req: Request, res: Response) => {
    const { courseId } = req.params; // get courseId from the params

    const traineeId = req.body.userId; // get traineeId from the body

    if (traineeId) {
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid traineeId' });
        }

        const individualTrainee = await IndividualTrainee.findOne(traineeId); // find individual trainee by traineeId

        const corporateTrainee = await CorporateTrainee.findOne(traineeId); // find corporate trainee by traineeId

        if (!individualTrainee && !corporateTrainee) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid traineeId' }); // 400
        }
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'traineeId is required' });
    }

    // this trainee has already rated this course
    const courseHaveRating = (await Course.findById(courseId).populate({
        path: 'ratings',
        match: { traineeId: traineeId },
    })) as ICourse; // populate ratings with traineeId

    if (courseHaveRating.ratings.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'You have already rated this course' }); // 400
    }

    req.body.traineeId = traineeId; // add traineeId to the body

    return new Rating(req.body)
        .save()
        .then((rating) => {
            Course.findByIdAndUpdate(courseId, { $push: { ratings: rating._id } }, { new: true }) // add rating to the course
                .populate('ratings') // populate ratings
                .then((course) => {
                    res.status(StatusCodes.CREATED).json(course); // 201
                })
                .catch((err) => {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message }); // 400
                });
        })
        .catch((err) => {
            res.status(StatusCodes.BAD_REQUEST).json({ message: err.message }); // 400
        });
};

const listRatings = async (req: Request, res: Response) => {
    const courseId = req.params.courseId; // get courseId from the params

    await Course.findById(courseId)
        .then(async (course) => {
            if (!course) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'Course not found' }); // 404
            }

            const ratings = course?.ratings; // get ratings from the course

            if (ratings) {
                await Rating.find({ _id: { $in: ratings }, comment: { $exists: true } }) // find ratings with comment
                    .populate('IndividualTrainee', 'firstName lastName')
                    .populate('CorporateTrainee', 'firstName lastName')
                    .then((ratings) => {
                        const ratingsWithTrainee = serializeRatingTrainee(ratings);
                        res.status(StatusCodes.OK).json({ ratings: ratingsWithTrainee });
                    })
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                res.status(StatusCodes.OK).json({ ratings: [] });
            }
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

const readRating = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const traineeId = req.body.userId;
    const course = (await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Course not found',
            });
        }
        return course as ICourse;
    })) as ICourse;
    const courseRatings = course.ratings;
    return await Rating.findOne({ traineeId: traineeId, _id: { $in: courseRatings } })
        .populate('IndividualTrainee', 'firstName lastName')
        .populate('CorporateTrainee', 'firstName lastName')
        .then((rating) => {
            if (!rating) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: 'Rating not found',
                });
            }
            const ratingWithTrainee = serializeRating(rating);
            return res.status(StatusCodes.OK).json({ rating: ratingWithTrainee });
        })
        .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
};

function serializeRatingTrainee(ratings: IRatingModel[]) {
    return ratings.map((rating) => serializeRating(rating));
}

export const serializeRating = (rating: IRatingModel) => {
    const trainee = rating.IndividualTrainee || rating.CorporateTrainee;

    return {
        _id: rating._id,
        trainee: trainee || null,
        rating: rating.rating,
        comment: rating.comment,
        createdAt: rating.createdAt,
    };
};

const updateRating = async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const traineeId = req.body.userId;

    const course: ICourseModel = (await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Course not found',
            });
        }
        return course;
    })) as ICourseModel;

    // validate traineeId
    if (req.body.traineeId) {
        const traineeId = req.body.traineeId;
        if (!mongoose.Types.ObjectId.isValid(traineeId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid traineeId',
            });
        }
        const individualTrainee = IndividualTrainee.findById(traineeId);
        const corporateTrainee = CorporateTrainee.findById(traineeId);
        if (!individualTrainee && !corporateTrainee) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Invalid traineeId',
            });
        }
    }

    Rating.findOne({ traineeId: traineeId, _id: { $in: course.ratings } })
        .then((rating) => {
            if (rating) {
                rating.set({
                    rating: req.body.rating,
                    comment: req.body.comment,
                });

                return rating
                    .save()
                    .then(async (rating) => {
                        await course.save();
                        res.status(StatusCodes.OK).json({ rating });
                    })
                    .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
            } else {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
};

const deleteRating = async (req: Request, res: Response) => {
    const ratingId = req.params.ratingId as unknown as mongoose.Types.ObjectId;
    const courseId = req.params.courseId;
    const traineeId = req.body.userId as unknown as mongoose.Types.ObjectId;

    const course: ICourse = (await Course.findById(courseId).then((course) => {
        if (!course) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Course not found',
            });
        }
        return course;
    })) as ICourse;

    if (mongoose.Types.ObjectId.isValid(ratingId)) {
        if (!course.ratings.includes(ratingId)) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'Rating does not belong to this course',
            });
        } else {
            await Rating.findByIdAndDelete(ratingId)
                .then((rating) => {
                    if (rating) {
                        if (rating.traineeId != traineeId) {
                            res.status(StatusCodes.BAD_REQUEST).json({
                                message: 'You are not allowed to delete this rating',
                            });
                        } else {
                            Course.findByIdAndUpdate(courseId, { $pull: { ratings: ratingId } })
                                .then(() => {
                                    res.status(StatusCodes.OK).json({ rating });
                                })
                                .catch((error) => res.status(StatusCodes.BAD_REQUEST).json({ error }));
                        }
                    } else {
                        return res.status(StatusCodes.NOT_FOUND).json({ message: 'not found' });
                    }
                })
                .catch((error) => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error }));
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Invalid ratingId',
        });
    }
};

export default {
    updateRating,
    createRating,
    listRatings,
    readRating,
    deleteRating,
};
