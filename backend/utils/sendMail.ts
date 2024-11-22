import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
import { GlobalErrorHandler } from "./GlobalErrorHandler";
dotenv.config();

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MYEMAIL,
    pass: process.env.MYEMAILPASSWORD,
  },
});

// Define a function to send emails
export const sendMail = async ({
  otp,
  recieverEmail,
}: {
  otp: string;
  recieverEmail: string;
}) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MYEMAIL,
      to: recieverEmail,
      subject: "Confirmation OTP",
      text: otp,
      html: `<p>Pls don't expose this otp: ${otp}</p>`,
    });
    console.log("Email sent:", info.messageId);
    return info.messageId;
  } catch (error) {
    const CustomError = error as Error;
    console.error("Failed to send email:", error);
    throw new GlobalErrorHandler(
      CustomError.name,
      CustomError.message,
      500,
      false,
      "error"
    );
  }
};
