import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async registerWithEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, email, password } = req.body;
            const user = await this.authService.registerWithEmail(username, email, password);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    // async registerWithPhoneNumber(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { username, phoneNumber } = req.body;
    //         const user = await this.authService.registerWithPhoneNumber(username, phoneNumber);
    //         res.status(201).json(user);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async registerWithSocialMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { provider, socialId } = req.body;
    //         const user = await this.authService.registerWithSocialMedia(provider, socialId);
    //         res.status(201).json(user);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async loginWithUsernameOrEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { usernameOrEmail, password } = req.body;
    //         const user = await this.authService.loginWithUsernameOrEmail(usernameOrEmail, password);
    //         const accessToken = this.authService.signAccessToken(user);
    //         const refreshToken = this.authService.signRefreshToken(user);
    //         res.json({ user, accessToken, refreshToken });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async loginWithPhoneNumber(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { phoneNumber, otp } = req.body;
    //         const user = await this.authService.loginWithPhoneNumber(phoneNumber, otp);
    //         const accessToken = this.authService.signAccessToken(user);
    //         const refreshToken = this.authService.signRefreshToken(user);
    //         res.json({ user, accessToken, refreshToken });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async loginWithSocialMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { provider, socialId } = req.body;
    //         const user = await this.authService.loginWithSocialMedia(provider, socialId);
    //         const accessToken = this.authService.signAccessToken(user);
    //         const refreshToken = this.authService.signRefreshToken(user);
    //         res.json({ user, accessToken, refreshToken });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { usernameOrEmail } = req.body;
    //         await this.authService.forgotPassword(usernameOrEmail);
    //         res.status(200).json({ message: 'Password reset instructions sent to your email' });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { passwordResetToken, newPassword } = req.body;
    //         const user = await this.authService.resetPassword(passwordResetToken, newPassword);
    //         res.status(200).json(user);
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export default AuthController;
