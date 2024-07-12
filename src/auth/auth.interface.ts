// import { IInstructor } from '@/instructor/instructor.interface';
import { IAdmin } from '@/admin/admin.interface';
// import { ITrainee } from '@/trainee/trainee.interface';
import { ITokenPayload } from '@/token/token.interface';
import { Request } from 'express';

export interface RequestWithTokenPayload extends Request {
    tokenPayload: ITokenPayload;
}
export interface RequestWithTokenPayloadAndUser extends RequestWithTokenPayload {
    user: IAdmin;
}

export enum AuthRole {
    ADMIN = 'ADMIN',
    INSTRUCTOR = 'INSTRUCTOR',
    INDIVIDUAL_TRAINEE = 'INDIVIDUAL TRAINEE',
    CORPORATE_TRAINEE = 'CORPORATE TRAINEE',
}

export interface ICookie {
    name: string;
    options: {
        httpOnly: boolean;
        maxAge: number;
        sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
        secure?: boolean;
    };
    value: string;
}
