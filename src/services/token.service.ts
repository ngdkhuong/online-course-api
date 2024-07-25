import jwt from 'jsonwebtoken';
import { Request, Response } from 'express'; // Assuming you are using Express
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '@config/index';
import { UserModel } from '@models/user.model';

interface TokenPayload {
    userId: string;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

class TokenService {
    private accessTokenSecret = JWT_ACCESS_TOKEN_SECRET as jwt.Secret; // Use environment variables in production
    private refreshTokenSecret = JWT_REFRESH_TOKEN_SECRET as jwt.Secret; // Use environment variables in production

    async generateToken(userId: string, res: Response): Promise<TokenResponse> {
        const accessToken = jwt.sign({ userId }, this.accessTokenSecret, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId }, this.refreshTokenSecret, { expiresIn: '7d' });

        // Set tokens in cookies
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        return { accessToken, refreshToken };
    }

    async verifyToken(refreshToken: string): Promise<string> {
        try {
            const decoded = jwt.verify(refreshToken, this.refreshTokenSecret) as TokenPayload;
            const userId = decoded.userId;

            // Check if refreshToken exists in the database
            const tokenExists = await UserModel.findOne({ _id: (decoded as TokenPayload).userId });
            if (!tokenExists) {
                throw new Error('Invalid refresh token');
            }

            // Generate a new accessToken
            const newAccessToken = jwt.sign({ userId }, this.accessTokenSecret, { expiresIn: '15m' });
            return newAccessToken;
        } catch (error) {
            throw new Error('Token verification failed');
        }
    }
}

export default new TokenService();
