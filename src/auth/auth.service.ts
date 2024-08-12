import AdminModel from '@admin/admin.model';
import InstructorModel from '@instructor/instructor.model';
import TraineeModel from '@trainee/trainee.model';
import { UserDTO } from '@user/user.dto';
import { UserRole } from '@user/user.enum';
import { findUserModelByRole } from '@user/user.service';
import { HttpException } from '@utils/http/HttpException';
import HttpStatusCodes from '@utils/http/HttpStatusCodes';
import { isEmpty } from '@utils/isEmpty';

class AuthService {
    public async signup(userData: UserDTO, role: UserRole, isCorporate = false): Promise<any> {
        if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

        // check if email or username already exists
        const query = {
            $or: [{ 'email.address': userData?.email?.address ?? '' }, { username: userData?.username ?? '' }],
        };

        const models = [TraineeModel, InstructorModel, AdminModel];

        for (const model of models) {
            const existingUser = await (model as any).findOne(query);
            if (existingUser) {
                if (existingUser.email.address === userData?.email?.address)
                    throw new HttpException(
                        HttpStatusCodes.BAD_REQUEST,
                        `This email ${userData.email.address} already exists`,
                    );
                if (existingUser.username === userData?.username)
                    throw new HttpException(
                        HttpStatusCodes.BAD_REQUEST,
                        `This username ${userData.username} already exists`,
                    );
            }
        }

        userData.email.isVerified = true;
        if (isCorporate) userData.isCorporate = true;

        const userModel = findUserModelByRole(role);
        const createUserData = await userModel.create({
            ...userData,
        });

        return createUserData;
    }
}
