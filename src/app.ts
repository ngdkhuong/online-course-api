import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/database';
// import { userRouter } from './routes/user';
// import { courseRouter } from './routes/course';
// import { lessonRouter } from './routes/lesson';
import { protect, admin } from './middleware/auth.middleware';
import authRouter from './routes/auth.route';
import { TokenUtils } from './utils/token';
import { AuthService } from './services/auth.service';

const app: Express = express();

const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is working',
    });
});

// service
const token = new TokenUtils();
// const otpService = new OTPService();
// const emailService = new EmailService();
const authService = new AuthService();

// Routes
app.use('/api/auth', authRouter);
// app.use('/api/courses', courseRouter);
// app.use('/api/lessons', lessonRouter);

app.listen(port, () => {
    console.log(`server is on port ${port}`);
    connectToDatabase();
});
