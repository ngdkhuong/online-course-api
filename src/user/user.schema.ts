import { Schema } from 'mongoose';

const Email: Schema = new Schema(
    {
        address: {
            lowercase: true,
            match: [/\S+@\S+\.\S+/, ' Email is invalid'],
            required: [true, " Email can't be left blank"],
            type: String,
        },
        isVerified: {
            default: false,
            type: Boolean,
        },
    },
    { _id: false },
);

const Phone: Schema = new Schema(
    {
        number: {
            type: String,
            required: [true, "Phone number can't be left blank"],
            match: [/^\+?\d{1,3}[- ]?\(?\d\)?[- ]?\d{1,13}$/, 'Phone number is invalid'],
        },
        isVerified: {
            default: false,
            type: Boolean,
        },
    },
    { _id: false },
);

export { Email, Phone };
