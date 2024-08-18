import express from 'express';
import AuthController from '../controllers/Auth';
import PasswordResetTokenController from '../controllers/PasswordResetToken';
// import authenticated from '../middleware/permissions/isAuthenticated';
import isAuthenticated from '../middlewares/isAuthenticated';
import rateLimiter from '../middlewares/rateLimit';

const router = express.Router();

router.post('/login', rateLimiter(5), AuthController.login);
router.get('/refresh', AuthController.refresh);
router.post('/logout', isAuthenticated, AuthController.logout);
router.post('/forgot', PasswordResetTokenController.sendPasswordResetToken);
router.get('/reset', PasswordResetTokenController.validatePasswordResetToken);
router.post('/reset', AuthController.resetPassword);
router.post('/change/:userId', isAuthenticated, AuthController.changePassword);

export default router;
