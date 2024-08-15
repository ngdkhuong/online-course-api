import { logger } from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

class HttpException extends Error {
    public status: StatusCodes;
    public message: string;

    constructor(status: StatusCodes, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({
            data: null,
            message,
            success: false,
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
