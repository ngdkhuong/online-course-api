import express, { Request, Response, NextFunction, Express } from 'express';

const app: Express = express();

app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: 'API is working',
    });
});

app.listen(8000, () => {
    console.log('server is on port 8000');
});
