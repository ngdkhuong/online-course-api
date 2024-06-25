import nodemailer, { Transporter } from 'nodemailer';

interface MailOptions {
    from?: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT!),
            secure: process.env.MAIL_SECURE === 'true',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async sendMail(options: MailOptions): Promise<void> {
        const mailOptions = {
            from: options.from || process.env.MAIL_FROM,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };

        await this.transporter.sendMail(mailOptions);
    }
}

export default MailService;
