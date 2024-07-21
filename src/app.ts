import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from '@middlewares/errorHandler';
import { sampleRoute } from '@routes/test.route';

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to accept header request methods
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Example route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Test route
app.use('/api/sample', sampleRoute);

// Use error-handling middleware
app.use(errorHandler);

export default app;
