import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import connectDB from './config/database.config';
// import { userRouter } from './routes/user';
// import { courseRouter } from './routes/course';
// import { lessonRouter } from './routes/lesson';
import { protect, admin } from './middleware/auth.middleware';

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

// Routes
// app.use('/api/users', userRouter);
// app.use('/api/courses', courseRouter);
// app.use('/api/lessons', lessonRouter);

app.listen(port, () => {
    console.log(`server is on port ${port}`);
    connectDB();
});
