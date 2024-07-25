// import { Request, Response } from 'express';
// import passport from 'passport';
// import AuthService from '@services/auth.service';
// import HttpStatusCodes from '@utils/HttpStatusCodes';
// import { IUser } from '@interfaces/user.interface';
// import TokenService from '@services/token.service';
// import sendMail from '@services/mailer.service';

// class AuthController {
//     public register = async (req: Request, res: Response): Promise<void> => {
//         const { email, password, fullName } = req.body;
//         try {
//             const user: IUser = await AuthService.register(email, password, fullName);
//             res.status(HttpStatusCodes.CREATED).json({
//                 message: 'User registered successfully',
//                 user,
//             });
//         } catch (error: any) {
//             res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: error.message });
//         }
//     };

//     private generateOTP(): string {
//         // Generate 6-digit OTP for email verification
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         return otp;
//     }

//     private async sendVerificationEmail(email: string, otp: string): Promise<void> {
//         try {
//             await sendMail(email);
//         } catch (error: any) {
//             throw new Error(`Failed to send verification email: ${error.message}`);
//         }
//     }

//     public login = (req: Request, res: Response): void => {
//         passport.authenticate('local', (err: any, user: IUser, info: any) => {
//             if (err) {
//                 return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//             }
//             if (!user) {
//                 return res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: info.message });
//             }
//             req.logIn(user, (err) => {
//                 if (err) {
//                     return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
//                 }
//                 return res.status(HttpStatusCodes.OK).json(user);
//             });
//         })(req, res);
//     };

//     public googleAuth = (req: Request, res: Response): void => {
//         passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
//     };

//     public googleAuthCallback = (req: Request, res: Response): void => {
//         passport.authenticate('google', {
//             successRedirect: '/',
//             failureRedirect: '/login',
//         })(req, res);
//     };

//     public githubAuth = (req: Request, res: Response): void => {
//         passport.authenticate('github', { scope: ['user:email'] })(req, res);
//     };

//     public githubAuthCallback = (req: Request, res: Response): void => {
//         passport.authenticate('github', {
//             successRedirect: '/',
//             failureRedirect: '/login',
//         })(req, res);
//     };
// }

// export default new AuthController();
