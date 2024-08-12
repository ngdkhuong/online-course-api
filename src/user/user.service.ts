import TraineeModel from '../trainee/trainee.model';
import { AuthRole } from '../auth/auth.interface';
import { UserRole } from './user.enum';
import InstructorModel from '../instructor/instructor.model';
import AdminModel from '../admin/admin.model';

export function findUserModelByRole(role: UserRole | AuthRole) {
    let userModel;
    switch (role) {
        case UserRole.TRAINEE:
        case AuthRole.INDIVIDUAL_TRAINEE:
        case AuthRole.CORPORATE_TRAINEE:
            userModel = TraineeModel;
            break;

        case UserRole.INSTRUCTOR:
        case AuthRole.INSTRUCTOR:
            userModel = InstructorModel;
            break;

        case UserRole.ADMIN:
        case AuthRole.ADMIN:
            userModel = AdminModel;
            break;

        default:
            userModel = null;
    }
    return userModel;
}
