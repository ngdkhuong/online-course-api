import IndividualTrainee from '../../../models/IndividualTrainee';
import { connectDBForTesting, disconnectDBForTesting, TIME_OUT } from '../../../utils/testUtilities';
import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import { individualTraineeFactory } from '../../models/trainee/factory';
import app from '../../../app';

const request = supertest(app);

describe('Individual Trainee API Tests', () => {
    describe('GET /api/individual-trainees', () => {
        beforeAll(async () => {
            await connectDBForTesting();
        }, TIME_OUT);

        it.skip('should return an empty array when database is empty', async () => {
            const response = await request.get('/individual-trainees');
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.individualTrainees).toEqual([]);
        });

        it.skip('should return an array of individual trainees', async () => {
            const randomLength = Math.floor(Math.random() * 10) + 1;
            for (let i = 0; i < randomLength; i++) {
                const individualTrainee = new IndividualTrainee(individualTraineeFactory());
                await individualTrainee.save();
            }
            const response = await request.get('/individual-trainees');
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.individualTrainees.length).toBe(randomLength);
        });

        afterAll(async () => {
            await disconnectDBForTesting();
        }, TIME_OUT);
    });
});
