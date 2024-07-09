const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./src/app.ts'];
const dotenv = require('dotenv');
dotenv.config();

const doc = {
    info: {
        version: '1.0.0',
        title: 'API Doc ',
        description: 'API Doc ',
    },
    host: `localhost:${process.env.SERVER_PORT}`,
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    components: {
        CorporateTrainee: {
            type: 'object',
            properties: {
                fullName: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                hashPassword: {
                    type: 'string',
                },
                _id: {
                    type: 'string',
                },
                corporate: {
                    type: 'string',
                },
                expiredAt: {
                    type: 'string',
                },
                status: {
                    type: 'string',
                },
            },
        },
    },
};
swaggerAutogen(outputFile, endpointsFiles, doc);
