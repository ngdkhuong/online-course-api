import express from 'express';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/api/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is working',
    });
});
