module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    moduleNameMapper: {
        '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@databases/(.*)$': '<rootDir>/src/databases/$1',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^@routes/(.*)$': '<rootDir>/src/routes/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
    },
};
