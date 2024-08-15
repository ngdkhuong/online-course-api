import { sendEmail } from './sendMail.service';

export const sendEnrollmentEmail = async (email: string, courseName: string) => {
    const context = {
        courseName: courseName,
        email: email,
    };
    sendEmail(email, context, 'instructorCredit', `KUONDEV | Course ${courseName} Enrollment 🎉`);
};
