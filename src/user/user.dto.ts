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
import { IUser } from './user.interface';
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

    public profileImage: string;

    @IsString()
    public username: string;

    @MinLength(8, { message: 'Password must be at least 8 characters' })
    public password: string;

    // @IsString()
    // @IsEnum(Role, { message: 'Choose from: Admin, Trainee or Instructor' })
    // public role: Role;
    public country: string;

    @IsString()
    public name: string;

    @IsPhoneNumber()
    public phone: { number: string; isVerified: boolean };

    public isCorporate: boolean;
}

export class UserLoginEmailDTO {
    @IsObject()
    public email: { address: string };
    @IsString()
    public username: string;
    @IsString()
    public password: string;
}

export class UserLoginPhoneDTO {
    @IsObject()
    public phone: { address: string };
    @IsString() 
    public username: string;
}
