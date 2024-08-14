import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    passwordHash: string;
    __t: string;

    isCorrectPassword(passwordHash: string): boolean;
}

export interface IUserModel extends IUser, Document {}

export class UserSchema extends Schema {
    constructor({}: Object = {}, options: Object = {}) {
        super({}, options);
        this.add({
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, required: true, trim: true },
            email: {
                type: String,
                required: true,
                unique: true,
                match: [/\S+@\S+\.\S+/, 'is invalid'], //regexr.com/70m6a
                trim: true,
                lowercase: true,
            },
            userName: { type: String, required: true, unique: true, trim: true, lowercase: true },
            password: { type: String, required: true },
        });
    }
}

const userSchema = new UserSchema({}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password as string, 10);
    }

    next();
});

userSchema.methods.isCorrectPassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;
