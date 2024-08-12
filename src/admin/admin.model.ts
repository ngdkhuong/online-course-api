import { model, Schema } from 'mongoose';
import { IAdmin } from './admin.interface';
import Email from '../user/email.validate';
import { genSalt, hash } from 'bcryptjs';

const adminSchema = new Schema<IAdmin>(
    {
        active: {
            default: false,
            type: Boolean,
        },
        email: {
            required: true,
            type: Email,
        },
        lastLogin: {
            type: Date,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        profileImage: {
            url: String,
            publicId: String,
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
        timestamps: true,
    },
);

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await genSalt();

    // this.lastLogin = new Date();
    this.password = await hash(this.password, salt);
    next();
});

const AdminModel = model<IAdmin>('Admin', adminSchema);

export default AdminModel;
