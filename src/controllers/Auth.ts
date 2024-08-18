import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserServices from '../services/user.service';
import { redis } from '../databases/redis';
import { IUserModel } from '../models/User';
import { verifyRefreshToken } from '../services/token.service';

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Missing email or password' });
    }

    return UserServices.login(email, password)
        .then((data) => {
            res.cookie('jwt', data.refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(StatusCodes.OK).json({
                accessToken: data.accessToken,
                userType: data.userType,
            });
        })
        .catch((error: any) => res.status(error.status).json({ message: error.message }));
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Missing refresh token' });
    }

    UserServices.refresh(refreshToken)
        .then((data) => {
            res.status(StatusCodes.OK).json({
                accessToken: data.accessToken,
                userType: data.userType,
            });
        })
        .catch((error: any) => res.status(error.status).json({ error: error.message }));
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.jwt;

    const { id: userId }: IUserModel = await verifyRefreshToken(refreshToken as string);

    if (!req.cookies?.jwt) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Missing refresh token' });
    }

    try {
        // Delete user ID from Redis
        await redis.del(userId);
        res.clearCookie('jwt', { httpOnly: true });
        res.status(StatusCodes.OK).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete user ID from Redis' });
    }
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token, newPassword } = req.body;

    return UserServices.resetPassword(token, newPassword)
        .then(() => res.status(StatusCodes.OK).json({ success: true }))
        .catch((error: any) => res.status(StatusCodes.UNAUTHORIZED).json({ error }));
};

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    return UserServices.changePassword(userId, oldPassword, newPassword)
        .then(() => res.status(StatusCodes.OK).json({ success: true }))
        .catch((error: any) => res.status(StatusCodes.UNAUTHORIZED).json({ error }));
};

export default {
    login,
    refresh,
    logout,
    resetPassword,
    changePassword,
};
