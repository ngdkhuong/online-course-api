import { sendEmail } from '../sendMail.service';

export const sendRefundRequestCreationEmail = async (email: string, courseName: string) => {
    const context = {
        courseName: courseName,
        email: email,
    };
    sendEmail(email, context, 'refundRequestCreation', `KUONDEV | Refund Request for Course ${courseName}`);
};
