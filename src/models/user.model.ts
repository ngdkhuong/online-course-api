import mongoose, { Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    username: string;
    active: Boolean;
    email: {
        address: string;
        isVerified: Boolean;
    };
    password: string;
    lastLogin: Date;
    profileImage: string;
    role: string;
    isCorrectPassword(password: string): boolean;
    isModified(field: string): boolean;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minLength: [6, 'Password must be at least 6 characters'],
        select: false,
        required: true,
    },
});

UserSchema.pre<IUser>('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(this.password, salt);
        this.password = hashedPassword;
    }
    next();
});

UserSchema.methods.isCorrectPassword = async function (inputPassword: string): Promise<boolean> {
    return bcrypt.compareSync(inputPassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
