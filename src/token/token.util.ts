import { HttpException } from '@/exceptions/HttpException';
import HttpStatusCodes from '@/utils/HttpStatusCodes';
import { sign, verify } from 'jsonwebtoken';
import UserToken from './token.model';
import { type ITokenPayload, ITokenService } from './token.interface';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '@/configs/config';
import { findUserModelByRole } from '@/user/user.util';

export const generateToken = async (tokenPayload: ITokenPayload): Promise<ITokenService> => {
    try {
        const accessToken = sign(tokenPayload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '20d' });
        const refreshToken = sign(tokenPayload, JWT_REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        const userId = tokenPayload._id;

        const userToken = await UserToken.findOne({ userId });

        if (userToken) await userToken.deleteOne({ userId });

        await new UserToken({ token: refreshToken, userId }).save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new HttpException(HttpStatusCodes.INTERNAL_SERVER_ERROR, "Can't Generate Token");
    }
};

export const verifyRefreshToken = (refreshToken: string) => {
    const findUser = UserToken.findOne({ token: refreshToken });

    if (!findUser) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN: Invalid Refresh Token');

    // TODO check refreshToken and re-sign Access Token
    return verify(refreshToken, JWT_REFRESH_TOKEN_SECRET, (err, tokenPayload) => {
        if (err) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN: Invalid Refresh Token');

        const { _id, role } = tokenPayload as ITokenPayload;

        const userModelByRole = findUserModelByRole(role);

        const findUser = userModelByRole.findOne({ _id });

        if (err) throw new HttpException(HttpStatusCodes.FORBIDDEN, 'FORBIDDEN: Invalid Refresh Token');

        const accessToken = sign(
            {
                _id,
                role,
            },
            JWT_REFRESH_TOKEN_SECRET,
            {
                expiresIn: '14m',
            },
        );

        return accessToken;
    });
};
