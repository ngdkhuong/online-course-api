import { Router } from 'express';
import AuthController from '@controllers/auth.controller';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleAuthCallback);
router.get('/github', AuthController.githubAuth);
router.get('/github/callback', AuthController.githubAuthCallback);

export default router;
