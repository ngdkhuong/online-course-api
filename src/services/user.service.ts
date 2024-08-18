import crypto from 'crypto';
import PasswordResetToken from '../models/ResetPasswordToken';
import User, { IUserModel } from '../models/User';
import { createRefreshToken, createAccessToken, verifyRefreshToken, decodeToken, TokenPayload } from './token.service';
import { UserTypesNames, UserType } from '../enums/UserType';
import { redis } from '../databases/redis';

interface AuthResponse {
    refreshToken?: string;
    accessToken: string;
    userType: UserType;
}

export default class UserServices {
    static login(email: string, password: string): Promise<AuthResponse> {
        return new Promise(async (resolve, reject) => {
            const user = await User.findOne({ email });

            if (!user || !user.isCorrectPassword(password)) {
                return reject({
                    status: 401,
                    message: 'Wrong email or password',
                });
            }

            const accessToken = createAccessToken(user);
            const refreshToken = await createRefreshToken(user);
            const userType = UserTypesNames.get(user.__t) as UserType;

            resolve({
                accessToken,
                refreshToken,
                userType,
            });
        });
    }

    static refresh(refreshToken: string): Promise<AuthResponse> {
        return new Promise((resolve, reject) => {
            verifyRefreshToken(refreshToken)
                .then((user: IUserModel) => {
                    resolve({
                        accessToken: createAccessToken(user),
                        userType: UserTypesNames.get(user.__t) as UserType,
                    });
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }

    static async getUserType(token: string) {
        if (token) {
            const decodedToken: TokenPayload = decodeToken(token) as TokenPayload;
            return decodedToken.userType;
        } else {
            return UserType.GUEST;
        }
    }

    static async resetPassword(token: string, newPassword: string) {
        try {
            const passwordResetToken = await PasswordResetToken.findOne({
                token: crypto
                    .createHash('sha256')
                    .update(token as string)
                    .digest('hex'),
            });
            if (!passwordResetToken) {
                throw new Error();
            }

            const user = await User.findById(passwordResetToken.userId);
            if (!user) {
                throw new Error();
            }

            user.password = newPassword;

            await user.save();
        } catch (error) {
            throw new Error('Failed to reset password');
        }
    }

    static async changePassword(userId: string, oldPassword: string, newPassword: string) {
        try {
            const user = await User.findById(userId);
            if (!user || !user.isCorrectPassword(oldPassword)) {
                throw new Error('Invalid user or password');
            }

            user.password = newPassword;
            await redis.set(userId, JSON.stringify(user));
            await user.save();
        } catch (error) {
            throw new Error('Failed to change password');
        }
    }
}
