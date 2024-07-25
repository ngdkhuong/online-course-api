import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from '@middlewares/errorHandler';
import { sampleRoute } from '@routes/test.route';
// import authRoute from '@routes/auth.route';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.raw());
app.use(express.static('public'));

// Middleware to accept header request methods
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Example route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, worlds !');
});

// Test route
app.use('/api/sample', sampleRoute);

// Use error-handling middleware
app.use(errorHandler);

export default app;
