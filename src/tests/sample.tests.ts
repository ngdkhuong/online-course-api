import request from 'supertest';
import app from '../app'; // Adjust the import based on your app's entry point

describe('GET /api/sample', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/api/sample');
        expect(response.status).toBe(200);
    });
});
