import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import mongoose_fuzzy_searching, { MongoosePluginModel } from '@imranbarbhuiya/mongoose-fuzzy-searching';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    __t: string;

    isCorrectPassword(password: string): boolean;
}

export interface IUserModel extends IUser, Document {}

export class UserSchema extends Schema {
    constructor(object: any, options: Object = {}) {
        super(object, options);
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
            username: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                default: function () {
                    return `${this.firstName} ${this.lastName}`;
                },
            },
            password: { type: String, required: true },
        });

        this.pre('save', function (next) {
            if (this.isModified('firstName') || this.isModified('lastName')) {
                this.username = (this as any).firstName + ' ' + (this as any).lastName;
            }

            next();
        });
    }
}

const userSchema = new UserSchema({}, { timestamps: true });

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });
userSchema.plugin(mongoose_fuzzy_searching, {
    fields: [
        {
            name: 'firstName',
            minSize: 3,
            prefixOnly: true,
        },
        {
            name: 'lastName',
            minSize: 3,
            prefixOnly: true,
        },
    ],
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password as string, 10);
    }

    next();
});

userSchema.methods.isCorrectPassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model<IUserModel>('User', userSchema) as MongoosePluginModel<IUserModel>;

export default User;
