import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export class TokenUtils {
    static generateAccessToken(user: IUser): string {
        return this.generateToken(user, process.env.ACCESS_TOKEN_SECRET as string, '15m');
    }

    static generateRefreshToken(user: IUser): string {
        return this.generateToken(user, process.env.REFRESH_TOKEN_SECRET as string, '7d');
    }

    static verifyAccessToken(token: string): { userId: string } {
        return this.verifyToken(token, process.env.ACCESS_TOKEN_SECRET as string);
    }

    static verifyRefreshToken(token: string): { userId: string } {
        return this.verifyToken(token, process.env.REFRESH_TOKEN_SECRET as string);
    }

    private static generateToken(user: IUser, secret: string, expiresIn: string): string {
        return jwt.sign({ userId: user._id }, secret, { expiresIn });
    }

    private static verifyToken(token: string, secret: string): { userId: string } {
        const decoded = jwt.verify(token, secret) as { userId: string };
        return decoded;
    }
}
