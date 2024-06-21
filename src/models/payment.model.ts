import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPayment extends Document {
    userId: string;
    courseId: string;
    amount: number;
    paymentMethod: string;
    paymentStatus: string;
    paymentDate: Date;
}

const paymentSchema: Schema<IPayment> = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, 'Please provide the user ID'],
        },
        courseId: {
            type: String,
            required: [true, 'Please provide the course ID'],
        },
        amount: {
            type: Number,
            required: [true, 'Please enter the payment amount'],
            min: [0, 'Amount must be a positive number'],
        },
        paymentMethod: {
            type: String,
            required: [true, 'Please provide the payment method'],
        },
        paymentStatus: {
            type: String,
            required: [true, 'Please provide the payment status'],
        },
        paymentDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

const paymentModel: Model<IPayment> = mongoose.model('Payment', paymentSchema);

export default paymentModel;
