import { logger } from '@utils/logger';
import { HttpException } from '@utils/http/HttpException';
import { Request, Response, NextFunction } from 'express';

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
