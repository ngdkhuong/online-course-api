import { IUser } from '../../models/User';
import { faker } from '@faker-js/faker';

export function userFactory(): IUser {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        __t: 'User',
        isCorrectPassword(password: string): boolean {
            return password === this.password;
        },
    };
}
