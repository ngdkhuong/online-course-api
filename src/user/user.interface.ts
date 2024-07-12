import { Types } from 'mongoose';
import { UserRole } from './user.enum';

export interface IUser {
    _id: Types.ObjectId;
    active: boolean;
    country: string;
    createdAt: Date;
    // dateOfBirth: Date;
    email: {
        address: string;
        isVerified: Boolean;
    };
    lastLogin: Date;
    password: string;
    phone: {
        number: string;
        isVerified: Boolean;
    };
    profileImage: string;
    role?: UserRole;
    username: string;
}
