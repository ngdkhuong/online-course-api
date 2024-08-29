import express, { Request, Response, NextFunction } from 'express';
import { NODE_ENV, ORIGIN, PORT } from './config';
import morgan from 'morgan';
import { stream } from './utils/logger';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Routes
import IndividualTraineeRouter from './routes/IndividualTrainee';
import CorporateTraineeRouter from './routes/CorporateTrainee';
import AuthRouter from './routes/Auth';
import InstructorRouter from './routes/Instructor';
import CourseRouter from './routes/Course';
import MeRouter from './routes/Me';

import { StatusCodes } from 'http-status-codes';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(morgan('dev', { stream }));

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ORIGIN);

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(StatusCodes.OK).json({});
    }

    next();
});

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(hpp());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// TODO: Add routes here
app.use('/api/auth', AuthRouter);
app.use('/api/individual-trainees', IndividualTraineeRouter);
app.use('/api/corporate-trainees', CorporateTraineeRouter);
app.use('/api/instructors', InstructorRouter);
app.use('/api/courses', CourseRouter);
app.use('/api/me', MeRouter);

const options: swaggerJSDoc.Options = {
    apis: ['src/routes/*.route.ts', 'src/dtos/*.dto.ts'],
    definition: {
        apis: ['swagger.json'],
        components: {
            securitySchemes: {
                bearerAuth: {
                    bearerFormat: 'JWT',
                    scheme: 'bearer',
                    type: 'http',
                },
            },
        },
        info: {
            contact: { email: 'osa.helpme@gmail.com' },
            description: '',
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
            },
            termsOfService: 'http://swagger.io/terms/',
            title: 'Swagger Courses API',
            version: '1.0.0',
        },
        openapi: '3.0.0',
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [{ url: 'http://localhost:3000' }],
    },
};

/* --- Basic Routes --- */
// Health Check
app.get('/ping', (req, res) => {
    return res.status(StatusCodes.OK).json({ message: 'pong' });
});
app.get('/test', async (_req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Hello World' });
});

const specs = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

app.use(errorMiddleware);

export default app;
