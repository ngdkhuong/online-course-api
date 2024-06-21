import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IEnrolment extends Document {
    userId: string;
    courseId: string;
    paymentId: string;
    isPaid: boolean;
    enrolledAt: Date;
}

const enrolmentSchema: Schema<IEnrolment> = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, 'Please provide the user ID'],
        },
        courseId: {
            type: String,
            required: [true, 'Please provide the course ID'],
        },
        paymentId: {
            type: String,
            required: [true, 'Please provide the payment ID'],
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        enrolledAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

const enrolmentModel: Model<IEnrolment> = mongoose.model('Enrolment', enrolmentSchema);

export default enrolmentModel;
