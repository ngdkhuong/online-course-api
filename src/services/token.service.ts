import { Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { redisClient } from '@databases/redis';
import { RedisKey } from 'ioredis';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '@config/index';
import { IUser } from '@interfaces/user.interface';

interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}

export class TokenService {
    private accessTokenExpire: number;
    private refreshTokenExpire: number;
    private accessTokenOptions: ITokenOptions;
    private refreshTokenOptions: ITokenOptions;

    constructor() {
        // parse environment variables to integrate with fallback
        this.accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300', 10);
        this.refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10);

        // options for cookies
        this.accessTokenOptions = {
            expires: new Date(Date.now() + this.accessTokenExpire * 60 * 60 * 1000),
            maxAge: this.accessTokenExpire * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax',
        };

        this.refreshTokenOptions = {
            expires: new Date(Date.now() + this.refreshTokenExpire * 24 * 60 * 60 * 1000),
            maxAge: this.refreshTokenExpire * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'lax',
        };
    }

    public sendToken(user: IUser, statusCode: number, res: Response) {
        const accessToken = this.generateAccessToken(user._id.toString());
        const refreshToken = this.generateRefreshToken(user._id.toString());

        const redisKey: RedisKey = user._id.toString();

        // upload session to redis
        redisClient.set(redisKey, JSON.stringify(user));

        // only set secure to true in production
        if (process.env.NODE_ENV === 'production') {
            this.accessTokenOptions.secure = true;
        }

        res.cookie('accessToken', accessToken, this.accessTokenOptions);
        res.cookie('refreshToken', refreshToken, this.refreshTokenOptions);

        res.status(statusCode).json({
            success: true,
            user,
            accessToken,
        });
    }

    private generateAccessToken(userId: string): string {
        const accessTokenOptions: SignOptions & { userId: string } = {
            expiresIn: this.accessTokenExpire,
            userId,
        };
        const accessToken = jwt.sign(accessTokenOptions, JWT_ACCESS_TOKEN_SECRET!);
        return accessToken;
    }

    private generateRefreshToken(userId: string): string {
        const refreshTokenOptions: SignOptions & { userId: string } = {
            expiresIn: this.refreshTokenExpire,
            userId,
        };
        const refreshToken = jwt.sign(refreshTokenOptions, JWT_REFRESH_TOKEN_SECRET!);
        return refreshToken;
    }
}
