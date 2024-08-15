import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';

export const sendEmail = async (
    email: string,
    context: any,
    templateName: string,
    subject: string,
    attachments?: Array<any>,
) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const TEMPLATE_DIR = 'src/services/emails/templates';
    const TEMPLATE_PATH = `${TEMPLATE_DIR}/${templateName}.ejs`;
    // Register partials
    handlebars.registerPartial('header', fs.readFileSync(`${TEMPLATE_DIR}/partials/header.ejs`, 'utf-8'));
    handlebars.registerPartial('footer', fs.readFileSync(`${TEMPLATE_DIR}/partials/footer.ejs`, 'utf-8'));

    const htmlFile = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
    const template = handlebars.compile(htmlFile);
    const htmlToSend = template(context);

    const message = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: subject,
        html: htmlToSend,
        attachments: attachments,
    };

    await transporter.sendMail(message).catch((err) => {
        console.log(err);
    });
};
