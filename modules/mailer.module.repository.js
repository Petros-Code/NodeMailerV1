import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";


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
        try{
            await this.transporter.sendMail({

                from: email,
                to : process.env.SMTP_USER,
                subject: `New message from ${name}`,
                html: `
                <h2> New contact message from: ${name}.</h2>
                <p>Message: </p>
                <p>${message}</p>
                `,
                attachments: file ? [{ path: file.path }] : []
            });
        
        await this.transporter.sendMail({
            from: `"Support" <${process.env.SMTP_USER}`,
            to: email,
            subject: "acknowledgment of receipt - We received your contact form.",
            html: `
                <h2>Hello ${name},</h2>
                <p>Many thanks for your message.</p>
                <p>We will answer you as soon as possible</p>
                <p>Best regards,</p>
                <p>Big Black Button TEAM</p>
            `
        }); 
        
        if (file) {
            fs.unlinkSync(file.path);
        }

        return { success: true, message: "Message sent with success !"}

    } catch (err) {
        console.error("Error: ", err);
        throw new Error("Error while submiting message");
    }    
  }
}   


export default MailerRepository;