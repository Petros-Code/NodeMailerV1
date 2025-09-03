import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

class Mailer {
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

    async sendVerificationEmail(email, name, token) {
        const verificationLink = `http://localhost:3000/users/verify/${token}`;

        const mailOptions = {
            from: `"NodeMailer" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Please confirm your account",
            html: `
                <h2>Hello ${name},</h2>
                <p>Thank you for subscribing</p>
                <p>To activate your new account, click on this link :</p>
                <a href="${verificationLink}">ACTIVATE !</a>
                <p>This link will expire in 15 minutes.</p>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }
}

export default new Mailer();