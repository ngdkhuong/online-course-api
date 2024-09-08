import { sendEmail } from '../sendMail.service';

export const sendAccessRequestApprovalEmail = async (email: string, courseTitle: string) => {
    const context = {
        courseTitle: courseTitle,
        email: email,
    };
    sendEmail(email, context, 'accessRequestApproval', 'KUONDEV | Access Approved 🟩');
};
