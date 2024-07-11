import express from 'express';
import { logger, stream } from '@/utils/logger';
import morgan from 'morgan';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;
    public allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`END: ${this.env}`);
            logger.info(`Server run on PORT: http://localhost:${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(morgan);
    }
}

export default App;
