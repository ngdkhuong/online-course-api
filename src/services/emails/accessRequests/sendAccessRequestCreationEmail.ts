import { sendEmail } from '../sendMail.service';

export const sendAccessRequestCreationEmail = async (email: string, courseTitle: string) => {
    const context = {
        courseTitle: courseTitle,
        email: email,
    };
    sendEmail(email, context, 'accessRequestCreation', `KUONDEV | Access Request for Course ${courseTitle}`);
};
