import { model, Schema } from 'mongoose';
import { IAdmin } from './admin.interface';
import { genSalt, hash } from 'bcryptjs';
import { Email } from '@/user/user.schema';
import { requiredString } from '@/common/models/common';

const adminSchema = new Schema<IAdmin>(
    {
        active: {
            default: true,
            type: Boolean,
        },
        country: String,
        // dateOfBirth: {
        //     trim: true,
        //     type: Date,
        // },
        email: {
            required: true,
            type: Email,
        },
        lastLogin: {
            type: Date,
        },
        password: { ...requiredString, minlength: 8 },
        phone: String,
        profileImage: {
            default: 'https://i.stack.imgur.com/l60Hf.png',
            type: String,
        },
        username: {
            match: [/^[a-zA-Z0-9]+$/, ' username is invalid'],
            required: [true, " username can't be blank"],
            type: String,
            unique: true,
        },
    },
    {
        versionKey: false,
    },
);

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await genSalt();

    this.password = await hash(this.password, salt);

    next();
});

const adminModel = model<IAdmin>('Admin', adminSchema);

export default adminModel;
