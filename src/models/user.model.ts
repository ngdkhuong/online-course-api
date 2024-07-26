import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        avatar: {
            public_id: {
                type: String,
                default: '',
            },
            url: {
                type: String,
                default: '',
            },
        },
        numberPhone: {
            type: String,
            default: '',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        githubId: {
            type: String,
            unique: true,
            sparse: true,
        },
        role: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export const UserModel = model<IUser>('User', userSchema);
