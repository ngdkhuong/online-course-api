import express, { Express, Request, Response } from 'express';
import { logger, stream } from './utils/logger';
import morgan from 'morgan';
import { CREDENTIALS, NODE_ENV, ORIGIN, PORT } from './configs/config';
import cors from 'cors';
import helmet from 'helmet';
import { version } from '../package.json';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from './middlewares/error.middleware';
import swaggerFile from '../swagger.json';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';
import hpp from 'hpp';
import modelsErrorMiddleware from './middlewares/modelsError.middleware';

class App {
    public app: Express;
    public env: string;
    public port: string | number;
    public allowedOrigins = ['http://localhost:8000', 'http://127.0.0.1:8000'];

    constructor() {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 8080;

        this.initializeMiddlewares();
        // this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`ENV: ${this.env}`);
            logger.info(`App listening on the http://localhost:${this.port}`);
            logger.info(`API on the http://localhost:${this.port}/docs`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(
            morgan(
                ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :message',
                { stream },
            ),
        );
        this.app.use((req, res, next) => {
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', ORIGIN);

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            //      if (req.headers.authorization !== API_KEY) return res.status(400).json({ message: 'not authorized only Omar Sherif', status: 'error' });
            // Pass to next layer of middleware
            next();
        });
        this.app.use(
            cors({
                credentials: CREDENTIALS,
                optionsSuccessStatus: 200,
                origin: (origin, callback) => {
                    if (this.allowedOrigins.indexOf(origin) !== -1 || !origin) {
                        callback(null, true);
                    } else {
                        callback(new Error('Not allowed by CORS'));
                    }
                },
            }),
        );

        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
        this.app.use(compression());
        this.app.use(express.json({ limit: '5mb' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
    }

    // private initializeRoutes(routes: Routes[]) {
    //     routes.forEach((route) => {
    //         this.app.use(`/api${route.path}`, route.router);
    //     });
    // }

    private initializeSwagger() {
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
                    title: 'Swagger Cousrses API',
                    version: version,
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

        const specs = swaggerJSDoc(options);
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs), swaggerUi.setup(swaggerFile));

        this.app.get('/swagger.json', (req: Request, res: Response) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(specs);
        });
    }

    private initializeErrorHandling() {
        this.app.use(modelsErrorMiddleware);
        this.app.use(errorMiddleware);
    }
}

export default App;
