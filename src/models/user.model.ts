import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    avatar: {
        public_id: string;
        url: string;
    };
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        avatar: {
            public_id: { type: String, required: true },
            url: { type: String, required: true },
        },
        role: { type: String, required: true, default: 'user' },
        isVerified: { type: Boolean, default: false },
        courses: [{ courseId: { type: String } }],
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

userSchema.methods.SignAccessToken = function (): string {
    return jwt.sign({ userId: this._id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });
};

userSchema.methods.SignRefreshToken = function (): string {
    return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};

export const User = model<IUser>('User', userSchema);
