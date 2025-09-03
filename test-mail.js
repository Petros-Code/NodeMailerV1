import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function testMail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

  try {
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Test Nodemailer",
      text: "Ceci est un test",
    });
    console.log("Mail envoyé !", info.messageId);
  } catch (err) {
    console.error("Erreur SMTP :", err.message);
  }
}

testMail();
