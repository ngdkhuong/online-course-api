import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmptyObject,
    IsNumberString,
    IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MinLength,
} from 'class-validator';

import { IUser } from '@user/user.interface';
import { Types } from 'mongoose';

export class UserDTO implements IUser {
    @IsOptional()
    lastLogin: Date;

    @IsOptional()
    _id: Types.ObjectId;

    @IsBoolean()
    @IsOptional()
    public active: boolean;

    // @IsObject()
    // @IsOptional()
    // public address: Address;

    @IsDate()
    @IsOptional()
    public createdAt: Date;

    @IsObject()
    @IsNotEmptyObject()
    public email: { address: string; isVerified: boolean };

    @IsObject()
    @IsOptional()
    public profileImage: { publicId: string; url: string };

    @IsString()
    public username: string;

    @MinLength(8, { message: 'Password must be at least 8 characters' })
    public password: string;

    // @IsString()
    // @IsEnum(Role, { message: 'Choose from: Admin, Trainee or Instructor' })
    // public role: Role;

    @IsString()
    public fullName: string;

    public isCorporate: boolean;
}

export class UserLoginDTO {
    @IsObject()
    public email: { address: string };
    @IsString()
    public username: string;
    @IsString()
    public password: string;
}
