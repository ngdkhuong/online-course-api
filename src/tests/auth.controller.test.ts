// import request from 'supertest';
// import express, { NextFunction, Request, Response } from 'express';
// import passport from 'passport';
// import authController from '@controllers/auth.controller';

// const app = express();
// app.use(express.json());
// app.get('/auth/google/callback', authController.googleAuthCallback);
// app.get('/auth/github', authController.githubAuth);
// app.get('/auth/github/callback', authController.githubAuthCallback);

// jest.mock('passport', () => ({
//     authenticate: jest.fn((strategy, options) => (req: Request, res: Response, next: NextFunction) => {
//         if (strategy === 'google' || strategy === 'github') {
//             if (req.query.error) {
//                 res.redirect(options.failureRedirect);
//             } else {
//                 res.redirect(options.successRedirect);
//             }
//         }
//     }),
// }));

// describe('Auth Controller', () => {
//     it('should initiate Google authentication', async () => {
//         const response = await request(app).get('/auth/google');
//         expect(response.status).toBe(302);
//         // Check if the redirect URL contains Google's OAuth URL
//         expect(response.header.location).toBe('/');
//     });

//     it('should redirect to success URL on successful Google authentication', async () => {
//         const response = await request(app).get('/auth/google/callback');
//         expect(response.status).toBe(302);
//         expect(response.header.location).toBe('/');
//     });

//     it('should redirect to failure URL on failed Google authentication', async () => {
//         const response = await request(app).get('/auth/google/callback?error=true');
//         expect(response.status).toBe(302);
//         expect(response.header.location).toBe('/login');
//     });

//     it('should initiate GitHub authentication', async () => {
//         const response = await request(app).get('/auth/github');
//         expect(response.status).toBe(302);
//         // Check if the redirect URL contains GitHub's OAuth URL
//         expect(response.header.location).toContain('https://github.com');
//     });

//     it('should redirect to success URL on successful GitHub authentication', async () => {
//         const response = await request(app).get('/auth/github/callback');
//         expect(response.status).toBe(302);
//         expect(response.header.location).toBe('/');
//     });

//     it('should redirect to failure URL on failed GitHub authentication', async () => {
//         const response = await request(app).get('/auth/github/callback?error=true');
//         expect(response.status).toBe(302);
//         expect(response.header.location).toBe('/login');
//     });
// });
