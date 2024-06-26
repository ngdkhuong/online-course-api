import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter: Router = express.Router();
const authController: AuthController = new AuthController();

authRouter.post('/register/email', (req, res, next) => authController.registerWithEmail(req, res, next));
// authRouter.post('/register/phone', authController.registerWithPhoneNumber);
// authRouter.post('/register/social', authController.registerWithSocialMedia);

// authRouter.post('/login/username-email', authController.loginWithUsernameOrEmail);
// authRouter.post('/login/phone', authController.loginWithPhoneNumber);
// authRouter.post('/login/social', authController.loginWithSocialMedia);

// authRouter.post('/forgot-password', authController.forgotPassword);
// authRouter.post('/reset-password', authController.resetPassword);

export default authRouter;
