import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(500).json({ message: 'Internal server error' });
};
