import { sendEmail } from './sendMail.service';

export const sendCertificateEmail = async (email: string, courseName: string, certificatePath: string) => {
    const context = {
        courseName: courseName,
        email: email,
    };

    const attachments = [
        {
            filename: 'certificate.pdf',
            path: certificatePath,
            contentType: 'application/pdf',
        },
    ];

    sendEmail(email, context, 'certificateUponCompletion', 'KUONDEV | Congrats 🎉', attachments);
};
