// authService.ts
import { IUser, User } from '../models/user.model';

interface IRegisterWithEmailRequest {
    email: string;
    username: string;
    password: string;
    otp: string;
}

export class AuthService {
    async registerWithEmail({
        email,
        username,
        password,
        otp,
    }: IRegisterWithEmailRequest): Promise<{ user: IUser; tokens: { accessToken: string; refreshToken: string } }> {
        if (!email || !password) {
            throw new Error('Email and password are required.');
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            throw new Error('Invalid email.');
        }

        // Generate and send OTP
        // const otp = await this.otpService.generateOTP(email);
        // await this.emailService.sendOTPEmail(email, otp);

        // Create a new user
        const user: UserResponse = new User({
            username,
            email,
            password,
            verified: false,
            otpExpiration: new Date(Date.now() + 300000), // OTP expires in 5 minutes
        });

        // Save the user to the database
        await user.save();

        return { user, tokens: { accessToken, refreshToken };
    }

    // async registerWithPhoneNumber(phone: string, password: string): Promise<IUser> {
    //     // Implement logic to register a user with phone number and password
    //     // Return a new User instance
    // }

    // async registerWithSocialMedia(profile: any): Promise<IUser> {
    //     // Implement logic to register a user with social media profile
    //     // Return a new User instance
    // }

    // async loginWithUsernameOrEmail(usernameOrEmail: string, password: string): Promise<IUser> {
    //     // Implement logic to login a user with username or email and password
    //     // Return the authenticated User instance
    // }

    // async loginWithPhoneNumber(phone: string, password: string): Promise<IUser> {
    //     // Implement logic to login a user with phone number and password
    //     // Return the authenticated User instance
    // }

    // async loginWithSocialMedia(profile: any): Promise<IUser> {
    //     // Implement logic to login a user with social media profile
    //     // Return the authenticated User instance
    // }

    // async forgotPassword(email: string): Promise<void> {
    //     // Implement logic to handle forgot password request
    //     // Send reset password instructions to the user's email
    // }

    // async resetPassword(userId: string, newPassword: string): Promise<void> {
    //     // Implement logic to reset the user's password
    // }
}
