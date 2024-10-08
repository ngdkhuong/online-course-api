import mongoose, { Document } from 'mongoose';

export interface IRating {
    comment?: string;
    rating: number;
    traineeId: mongoose.Types.ObjectId;
    IndividualTrainee?: mongoose.Types.ObjectId;
    CorporateTrainee?: mongoose.Types.ObjectId;
    createdAt?: Date;
}

export interface IRatingModel extends IRating, Document {}

const ratingSchema = new mongoose.Schema(
    {
        comment: { type: String, required: false, trim: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        traineeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        timeStamps: true,
    },
);

ratingSchema.virtual('IndividualTrainee', {
    ref: 'IndividualTrainee',
    localField: 'traineeId',
    foreignField: '_id',
    justOne: true,
});

ratingSchema.virtual('CorporateTrainee', {
    ref: 'CorporateTrainee',
    localField: 'traineeId',
    foreignField: '_id',
    justOne: true,
});

export default mongoose.model<IRatingModel>('Rating', ratingSchema);
