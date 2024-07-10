import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string;
    email: string;
    phone: string;
    password: string;
    profileImage: string;
    role: string;
    isCorrectPassword(passwordHash: string): boolean;
}

export class UserSchema extends Schema {
    constructor(obj: any, options: Object) {
        super(obj, options);

        this.add({
            email: {
                type: String,
                required: true,
                unique: true,
                match: [/\S+@\S+\.\S+/, 'is invalid'],
                trim: true,
                lowercase: true,
            },
            phone: {
                type: String,
                required: true,
            },
            username: {
                required: true,
                unique: true,
                trim: true,
                lowercase: true,
            },
            password: {
                type: String,
                required: true,
            },
        });
    }
}

const userSchema = new UserSchema({}, {});

userSchema.pre<IUser>('save', function (next) {
    if (!this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    next();
});

userSchema.methods.isCorrectPassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
