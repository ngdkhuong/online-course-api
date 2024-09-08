import { sendEmail } from '../sendMail.service';

export const sendRefundRequestApprovalEmail = async (email: string, refundAmount: number) => {
    const context = {
        refundAmount: refundAmount,
        email: email,
    };
    sendEmail(email, context, 'refundRequestApproval', 'KUONDEV | Refund Approved 🟩');
};
