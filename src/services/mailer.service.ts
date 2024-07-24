import nodemailer, { Transporter } from 'nodemailer';
import { SMTP_HOST, SMTP_MAIL, SMTP_PASSWORD, SMTP_PORT, SMTP_SERVICE } from '@config/index';
import ejs from 'ejs';
import path from 'path';

interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
    const transporter: Transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT || '587'),
        service: SMTP_SERVICE,
        auth: {
            user: SMTP_MAIL,
            pass: SMTP_PASSWORD,
        },
    });

    const { email, subject, template, data } = options;

    // get the path to the email template file
    const templatePath = path.join(__dirname, '../templates', template);

    // Render the email template with EJS
    const html: string = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: 'KUONDEV E-learning',
        to: email,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;
