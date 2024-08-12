import { Request } from 'express';
import { IAdmin } from '../admin/admin.interface';
import { IInstructor } from '../instructor/instructor.interface';
import { ITokenPayload } from '../token/token.interface';
import { ITrainee } from '../trainee/trainee.interface';

export interface RequestWithTokenPayload extends Request {
    tokenPayload: ITokenPayload;
}

export interface RequestWithTokenPayloadAndUser extends RequestWithTokenPayload {
    user: ITrainee | IAdmin | IInstructor;
}

export enum AuthRole {
    ADMIN = 'ADMIN',
    INSTRUCTOR = 'INSTRUCTOR',
    INDIVIDUAL_TRAINEE = 'INDIVIDUAL_TRAINEE',
    CORPORATE_TRAINEE = 'CORPORATE_TRAINEE',
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
