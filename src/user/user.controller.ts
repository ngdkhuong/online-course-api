import { IAdmin } from '@admin/admin.interface';
import { RequestWithTokenPayloadAndUser } from '@auth/auth.interface';
import { NextFunction, Response } from 'express';
import { IInstructor } from '@instructor/instructor.interface';
import { ITrainee } from '@trainee/trainee.interface';
import { HttpResponse } from '@utils/http/HttpResponse';
import { UserRole } from './user.enum';
// import { getConversionRate, getCurrencyFromCountry } from ""

class UserController {
    public getUserInfo = async (
        req: RequestWithTokenPayloadAndUser,
        res: Response<HttpResponse<(IInstructor | ITrainee | IAdmin) & { currency: string; role: UserRole }>>,
        next: NextFunction,
    ): Promise<void> => {
        const country = (req.query.country as string) ?? 'US';
        // const currency = await getCurrencyFromCountry(country);
        // const conversionRate = await getConversionRate(country);

        // if (<ITrainee | IInstructor>req.user) {
        //     (<ITrainee | IInstructor>req.user).balance = conversionRate * (<ITrainee | IInstructor>req.user).balance;
        // }
        
    };
}

export default UserController;
