import { Request, Response, NextFunction } from 'express';
import { TokenPayload, verifyAccessToken } from '../services/token.service';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || (req.headers.authorization as string);

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    verifyAccessToken(token)
        .then((decoded: TokenPayload) => {
            req.body.userId = decoded.id;
            req.body.userType = decoded.userType;
            next();
        })
        .catch((error: any) => res.status(401).json({ error, message: 'Unauthorized' }));
};

export default isAuthenticated;
