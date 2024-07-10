import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { UserType, UserTypesNames } from '../enums/user.type';
import { StatusCodes } from 'http-status-codes';

export interface TokenPayload extends Object {
    id: string;
    userType: UserType;
}

export const createAccessToken = (user: IUser): string => {
    return jwt.sign(
        {
            id: user._id,
            userType: UserTypesNames.get(user.role),
        },
        process.env.JWT_ACCESS_TOKEN_SECRET as jwt.Secret,
        { expiresIn: '15d' }, // TODO: change to 15m and handle expiration in frontend
    );
};

export const createRefreshToken = (user: IUser): string => {
    return jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_REFRESH_TOKEN_SECRET as jwt.Secret,
        { expiresIn: '7d' },
    );
};

export const verifyRefreshToken = (refreshToken: string): Promise<IUser> => {
    return new Promise((isOk, isFail) => {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET as jwt.Secret, async (err, decoded) => {
            if (isFail) {
                return isFail({
                    status: StatusCodes.FORBIDDEN,
                    message: 'Invalid refresh token',
                });
            }

            const user = await User.findOne({ _id: (decoded as TokenPayload).id });

            if (!user) {
                return isFail({
                    status: StatusCodes.UNAUTHORIZED,
                    message: 'User not found',
                });
            }

            return isOk(user);
        });
    });
};

export const verifyAccessToken = async (accessToken: string): Promise<TokenPayload> => {
    return new Promise((isOk, isFail) => {
        jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET as jwt.Secret, (err, decoded) => {
            if (err) {
                return isFail(err);
            }

            isOk(decoded as TokenPayload);
        });
    });
};

export const decodeToken = (token: string): TokenPayload => {
    try {
        return jwt.decode(token) as TokenPayload;
    } catch (error) {
        return null;
    }
};
