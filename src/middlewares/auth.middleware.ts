// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const accessTokenSecret = 'ACCESS_TOKEN_SECRET'; // Use your actual secret

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//     // Extract the token from cookies
//     const token = req.cookies['accessToken'];

//     if (token == null) {
//         return res.sendStatus(401); // If there's no token, return a 401 Unauthorized
//     }

//     jwt.verify(token, accessTokenSecret, (err, user) => {
//         if (err) {
//             return res.; // If the token is not valid, return a 403 Forbidden
//         }

//         req.user = user; // Add the user payload to the request object
//         next(); // Proceed to the next middleware or route handler
//     });
// };
