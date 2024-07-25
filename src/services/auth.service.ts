// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '@config/index';
// import { IUser } from '@interfaces/user.interface';
// import { UserModel } from '@models/user.model';
// import sendMail from './mailer.service';

// class AuthService {
//     private static generateOTP(): string {
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         return otp;
//     }

//     private static async sendVerificationEmail(email: string, otp: string): Promise<void> {
//         // Implementation to send email verification
//         const options = {
//             email,
//             subject: 'Email Verification',
//             template: 'email-verification.ejs',
//             data: { otp },
//         };
//         return sendMail(options);
//     }

//     public static async register(email: string, fullName: string, password: string): Promise<IToken> {
//         // Check if user already exists
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             throw new Error('User already exists');
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const user = await UserModel.create({ email, fullName, password: hashedPassword, role: 'trainee' });
//         const otp = AuthService.generateOTP();
//         await AuthService.sendVerificationEmail(email, otp);
//         return user;
//     }

//     public static async validateUser(identifier: string, password: string): Promise<IUser | null> {
//         const user = await UserModel.findOne({
//             $or: [{ email: identifier }, { username: identifier }],
//         });
//         if (user && (await bcrypt.compare(password, user.password))) {
//             return user;
//         }
//         return null;
//     }

//     public static generateAccessToken(user: IUser): string {
//         return jwt.sign({ userId: user._id, email: user.email }, JWT_ACCESS_TOKEN_SECRET!, { expiresIn: '1h' });
//     }

//     public static async refreshToken(userId: string): Promise<string> {
//         // This method assumes you have a mechanism to validate and store refresh tokens
//         const user = await UserModel.findById(userId);
//         if (!user) throw new Error('User not found');
//         return jwt.sign({ userId: user._id, email: user.email }, JWT_REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
//     }

//     public static async forgotPassword(email: string): Promise<void> {
//         // Implementation for sending a password reset email
//     }

//     public static async resetPassword(token: string, newPassword: string): Promise<void> {
//         // Implementation for resetting the user's password using the token
//     }
// }

// export default AuthService;
