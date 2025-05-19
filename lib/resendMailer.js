import { Resend } from "resend";
import dotenv from 'dotenv';

dotenv.config();  

const client = new Resend(process.env.RESEND_API_KEY);

export const sendEmailNotification = async ({ to, subject, text }) => {
  try {
    const email = await client.emails.send({
      from: "devansh@onresend.com", // replace with your email
      to,
      subject,
      text,
    });

    console.log("Email sent:", email);
    return email;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
