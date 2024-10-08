import { faker } from '@faker-js/faker';
import { ITraineeModel } from '../../../models/Trainee';
import { IIndividualTraineeModel } from '../../../models/IndividualTrainee';
import { ICorporateTraineeModel, status } from '../../../models/CorporateTrainee';
import { userFactory } from '../userFactory';

export function traineeFactory(): ITraineeModel {
    const trainee = userFactory() as ITraineeModel;
    trainee['courses'] = [];
    return trainee;
}

export function individualTraineeFactory(): IIndividualTraineeModel {
    const IndividualTrainee = traineeFactory() as IIndividualTraineeModel;
    IndividualTrainee['__t'] = 'IndividualTrainee';
    IndividualTrainee['wallet'] = 0;
    return IndividualTrainee;
}

export function corporateTraineeFactory(): ICorporateTraineeModel {
    const CorporateTrainee = traineeFactory() as ICorporateTraineeModel;
    CorporateTrainee['corporate'] = faker.company.name();
    CorporateTrainee['expiredAt'] = faker.date.between({ from: '2000-01-01', to: '2030-01-01' });
    CorporateTrainee['__t'] = 'CorporateTrainee';
    return CorporateTrainee;
}
