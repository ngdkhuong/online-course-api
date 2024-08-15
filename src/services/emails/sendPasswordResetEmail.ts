import { sendEmail } from './sendMail.service';

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const context = {
        url: `${process.env.FRONT_END_URL}/auth/reset?token=${token}`,
        email,
    };
    sendEmail(email, context, 'passwordResetEmail', 'KUONDEV | Password Reset');
};
