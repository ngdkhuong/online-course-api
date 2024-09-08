import { sendEmail } from '../sendMail.service';

export const sendRefundRequestRejectionEmail = async (email: string) => {
    const context = {
        email: email,
    };
    sendEmail(email, context, 'refundRequestRejection', 'Linear Depression | Refund Request Rejected 🟥');
};
