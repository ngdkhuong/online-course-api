import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ICertificate } from './course/certificate.model';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    phoneNumber: string;
    avatar: {
        public_id: string;
        url: string;
    };
    otp: {
        code: string;
        expiresAt: Date;
    };
    googleId?: string;
    githubId?: string;
    courses: Array<{ courseId: string }>;
    progress: {
        [courseId: string]: {
            completed: boolean;
            certificate?: ICertificate;
        };
    };
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        otp: {
            code: {
                type: String,
            },
            expiresAt: {
                type: Date,
            },
        },
        role: {
            type: String,
            required: true,
            default: 'user',
        },
        googleId: {
            type: String,
            unique: true,
        },
        githubId: {
            type: String,
            unique: true,
        },
        courses: [
            {
                courseId: { type: String },
            },
        ],
        progress: {
            type: Map,
            of: new Schema({
                completed: { type: Boolean, default: false },
                certificate: {
                    courseId: { type: String },
                    issuedAt: { type: Date },
                },
            }),
        },
        passwordResetToken: { type: String },
        passwordResetExpires: { type: Date },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>('User', userSchema);
