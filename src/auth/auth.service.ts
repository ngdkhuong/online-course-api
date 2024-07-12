import { HttpException } from '@/exceptions/HttpException';
import { UserDTO } from '@/user/user.dto';
import { UserRole } from '@/user/user.enum';
import HttpStatusCodes from '@/utils/HttpStatusCodes';
import { isEmpty } from '@/utils/util';
import { findUserModelByRole, MapUserRoleToAuth } from '@/user/user.util';

class AuthService {
    public async signup(userData: UserDTO, role: UserRole, isCorporate = false): Promise<any> {
        if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

        const query = {
            $or: [{ 'email.address': userData?.email?.address ?? '' }, { username: userData?.username ?? '' }],
        };

        // Check email or username already exists
        const existingUser = await findUserModelByRole(role).findOne(query);
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

        // Check if phone number already exists
        if (UserRole.TRAINEE && userData?.phone?.number) {
            const phoneQuery = { 'phone.number': userData.phone.number };
            const existingPhoneUser = await findUserModelByRole(role).findOne(phoneQuery);
            if (existingPhoneUser)
                throw new HttpException(
                    HttpStatusCodes.BAD_REQUEST,
                    `This phone number ${userData.phone.number} already exists`,
                );
        }

        // if (userData?.googleGithubVerification?.provider && userData?.googleGithubVerification?.userId) {
        //     const googleGithubQuery = {
        //       'googleGithubVerification.provider': userData.googleGithubVerification.provider,
        //       'googleGithubVerification.userId': userData.googleGithubVerification.userId,
        //     };

        userData.email.isVerified = true;
        userData.phone.isVerified = true;
        // userData.googleGithubVerification.isVerified = true;
        if (isCorporate) userData.isCorporate = true;

        const userModel = findUserModelByRole(role);

        const createUserData = await userModel.create({
            ...userData,
        });

        return createUserData;
    }
}

export default AuthService;
