import { Types } from 'mongoose';
import { AuthRole } from '../auth/auth.interface';

export interface IToken extends Document {
    createdAt: Date;
    token: string;
    userId: Types.ObjectId;
}

export interface ITokenPayload {
    _id: Types.ObjectId;
    role: AuthRole;
}

export interface ITokenService {
    accessToken: string;
    refreshToken: string;
}
