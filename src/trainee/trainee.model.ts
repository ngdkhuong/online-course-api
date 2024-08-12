import { model, Schema } from 'mongoose';
import { ITrainee } from './trainee.interface';
import Email from '../user/user.validate';

const traineeSchema = new Schema<ITrainee>({
    email: {
        required: true,
        type: Email,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
});

const TraineeModel = model<ITrainee>('Trainee', traineeSchema);

export default TraineeModel;
