import { Types } from 'mongoose';
import { UserRole } from './user.enum';

export interface IUser {
    _id: Types.ObjectId;
    active: boolean;
    email: {
        address: string;
        isVerified: Boolean;
    };
    lastLogin: Date;
    fullName: string;
    password: string;
    profileImage: {
        url: string;
        publicId: string;
    };
    role?: UserRole;
    username: string;
    createdAt: Date;
}
