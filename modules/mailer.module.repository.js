import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailerRepository {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    async sendMail({ name, email, message, file }) {
        const mailOptions = {
            from: email,
            to : process.env.SMTP_USER,
            subject: `New message from ${name}`,
            text: `
                Name: ${name}
                Message: ${message}
            `,
            attachments: file ? [{ path: file.path }] : []
        };
        return this.transporter.sendMail(mailOptions);
    }

}

export default MailerRepository;