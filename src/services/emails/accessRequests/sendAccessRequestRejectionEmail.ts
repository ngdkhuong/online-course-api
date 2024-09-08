import { sendEmail } from '../sendMail.service';

export const sendAccessRequestRejectionEmail = async (email: string, courseTitle: string) => {
    const context = {
        courseTitle: courseTitle,
        email: email,
    };
    sendEmail(email, context, 'accessRequestRejection', 'KUONDEV | Access Request Rejected 🟥');
};
