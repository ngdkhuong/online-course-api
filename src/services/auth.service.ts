import { User, IUser } from '../models/user.model';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import MailService from './mail.service';
import dotenv from 'dotenv';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthService {
    private mailService: MailService;

    constructor() {
        this.mailService = new MailService();
    }

    async registerWithEmailAndPassword(username: string, email: string, password: string): Promise<IUser> {
        const otp = this.generateOTP();
        // Send OTP to email
        await this.sendOTPViaEmail(email, otp);
        const user = new User({ username, email, password, otp });
        await user.save();
        return user;
    }

    async registerWithPhoneNumber(username: string, phoneNumber: string): Promise<IUser> {
        const otp = this.generateOTP();
        // Send OTP to phone number
        await this.sendOTPViaPhone(phoneNumber, otp);
        const user = new User({ username, phoneNumber, otp });
        await user.save();
        return user;
    }

    async registerWithSocialMedia(provider: 'google' | 'github', socialId: string): Promise<IUser> {
        let user = await User.findOne({ [`${provider}Id`]: socialId });
        if (!user) {
            user = new User({ [`${provider}Id`]: socialId });
            await user.save();
        }
        return user;
    }

    async loginWithUsernameOrEmail(usernameOrEmail: string, password: string): Promise<IUser> {
        const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!user) throw new Error('User not found');
        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid password');
        return user;
    }

    async loginWithPhoneNumber(phoneNumber: string, otp: string): Promise<IUser> {
        const user = await User.findOne({ phoneNumber });
        if (!user) throw new Error('User not found');
        if (user.otp.code !== otp || user.otp.expiresAt < new Date()) {
            throw new Error('Invalid OTP');
        }
        return user;
    }

    async loginWithSocialMedia(provider: 'google' | 'github', socialId: string): Promise<IUser> {
        let user = await User.findOne({ [`${provider}Id`]: socialId });
        if (!user) {
            user = new User({ [`${provider}Id`]: socialId });
            await user.save();
        }
        return user;
    }

    async forgotPassword(usernameOrEmail: string): Promise<void> {
        const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!user) throw new Error('User not found');

        // Generate a password reset token
        const otp = this.generateOTP();
        user.passwordResetToken = otp;
        user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000); // Token expires in 30 minutes
        await user.save();

        // Send the password reset email
        await this.mailService.sendMail({
            to: user.email,
            subject: 'Password Reset Request',
            text: `Please use the following token to reset your password: ${otp}`,
        });
    }

    async resetPassword(passwordResetToken: string, newPassword: string): Promise<IUser> {
        const user = await User.findOne({
            passwordResetToken,
            passwordResetExpires: { $gt: new Date() },
        });
        if (!user) throw new Error('Invalid or expired password reset token');

        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        return user;
    }

    signAccessToken(user: IUser): string {
        return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN!, { expiresIn: '15m' });
    }

    signRefreshToken(user: IUser): string {
        return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN!, { expiresIn: '7d' });
    }

    private generateOTP(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    private async sendOTPViaEmail(email: string, otp: string): Promise<void> {
        // Code to send OTP via email
    }

    private async sendOTPViaPhone(phoneNumber: string, otp: string): Promise<void> {
        // Code to send OTP via phone
    }
}
