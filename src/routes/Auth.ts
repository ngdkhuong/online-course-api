import express from 'express';
import AuthController from '../controllers/Auth';
// import PasswordResetTokenController from '../controllers/PasswordResetToken';
// import authenticated from '../middleware/permissions/isAuthenticated';
import isAuthenticated from '../middlewares/isAuthenticated';
import rateLimiter from '../middlewares/rateLimit';

const router = express.Router();

router.post('/login', rateLimiter(5), AuthController.login);
router.post('/logout', isAuthenticated, AuthController.logout);

export default router;
