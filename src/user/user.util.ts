import adminModel from '../admin/admin.model';
import { AuthRole } from '../auth/auth.interface';
// import instructorModel from '../instructor/instructor.model';
// import traineeModel from '../trainee/trainee.model';
import { UserRole } from './user.enum';

export function findUserModelByRole(role: UserRole | AuthRole) {
    let userModel;
    switch (role) {
        case UserRole.TRAINEE:
        case AuthRole.INDIVIDUAL_TRAINEE:
        case AuthRole.CORPORATE_TRAINEE:
            // userModel = traineeModel;
            break;

        case UserRole.INSTRUCTOR:
        case AuthRole.INSTRUCTOR:
            // userModel = instructorModel;
            break;

        case UserRole.ADMIN:
        case AuthRole.ADMIN:
            userModel = adminModel;
            break;

        default:
            userModel = null;
    }
    return userModel;
}

export function MapUserRoleToAuth(role: UserRole, isCorporate: boolean): AuthRole {
    let authRole: any;
    switch (role) {
        case UserRole.TRAINEE:
            authRole = isCorporate ? AuthRole.CORPORATE_TRAINEE : AuthRole.INDIVIDUAL_TRAINEE;
            break;

        case UserRole.INSTRUCTOR:
            authRole = AuthRole.INSTRUCTOR;
            break;

        case UserRole.ADMIN:
            authRole = AuthRole.ADMIN;
            break;

        default:
            authRole = null;
    }
    return authRole;
}

export function MapAuthRoleToUser(role: AuthRole) {
    let userRole;
    switch (role) {
        case AuthRole.INDIVIDUAL_TRAINEE:
        case AuthRole.CORPORATE_TRAINEE:
            userRole = UserRole.TRAINEE;
            break;

        case AuthRole.INSTRUCTOR:
            userRole = UserRole.INSTRUCTOR;
            break;

        case AuthRole.ADMIN:
            userRole = UserRole.ADMIN;
            break;

        default:
            userRole = null;
    }
    return userRole;
}
