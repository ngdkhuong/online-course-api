import request from 'supertest';
import app from '../app'; // Assuming your Express app is exported from this file

describe('Example API Tests', () => {
    it('should return a 200 status code and "Hello, World!" message', async () => {
        const response = await request(app).get('/api/hello');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hello, World!');
    });

    it('should return a 404 status code for an invalid route', async () => {
        const response = await request(app).get('/api/invalid');

        expect(response.status).toBe(404);
    });
});
