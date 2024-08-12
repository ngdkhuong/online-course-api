import { HttpException } from '../utils/http/HttpException';
import HttpStatusCodes from '../utils/http//HttpStatusCodes';
import { sign, verify } from 'jsonwebtoken';
import UserToken from './token.model';

import { findUserModelByRole } from '../user/user.service';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '../config/index';
import { ITokenPayload, ITokenService } from './token.interface';

export const generateTokens = async (tokenPayload: ITokenPayload): Promise<ITokenService> => {
    try {
        // const accessToken = sign(tokenPayload, ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: '14m' });
        const accessToken = sign(tokenPayload, JWT_ACCESS_TOKEN_SECRET || '', { expiresIn: '20d' });
        const refreshToken = sign(tokenPayload, JWT_REFRESH_TOKEN_SECRET || '', { expiresIn: '30d' });
        // we check if the user already has a refresh token
        const userId = tokenPayload._id;

        const userToken = await UserToken.findOne({ userId });

        if (userToken) await userToken.deleteOne({ userId });
        // we save refresh token into the Database
        await new UserToken({ token: refreshToken, userId }).save();
        return { accessToken, refreshToken };
    } catch (err) {
        throw new HttpException(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Cant Generate Token');
    }
};

export const verifyRefreshToken = (refreshToken: string) => {
    const privateKey = JWT_REFRESH_TOKEN_SECRET || '';

    const findUser = UserToken.findOne({ token: refreshToken });
    if (!findUser) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN : Invalid Refresh Token');

    return verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN : Invalid Refresh Token');
        const { _id, role } = tokenDetails as ITokenPayload;
        const userModel = findUserModelByRole(role);
        const findUser = userModel.findOne({ _id });
        if (!findUser) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN : Invalid Refresh Token');
        const accessToken = sign(
            {
                _id,
                role,
            },
            JWT_ACCESS_TOKEN_SECRET || '',
            { expiresIn: '14m' },
        );
        return accessToken;
    });
};
