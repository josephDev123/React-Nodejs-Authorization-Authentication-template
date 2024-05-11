import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const Oauth = google.auth.OAuth2;
const OauthClient = new Oauth(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
OauthClient.setCredentials({ refresh_token: process.env.EMAIL_REFRESH_TOKEN });

// Define a function to send emails
export const sendMail = async ({ otp, email }: { otp: any; email: any }) => {
  try {
    const access_token = await OauthClient.getAccessToken();

    // Create a reusable transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MYEMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: access_token.token as string,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MYEMAIL,
      to: email,
      subject: "Confirmation OTP",
      text: otp,
      html: `<p>Pls don't expose this otp: ${otp}</p>`,
    });
    console.log("Email sent:", info.messageId);
    return info.messageId;
  } catch (error: any) {
    console.error("Failed to send email:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
