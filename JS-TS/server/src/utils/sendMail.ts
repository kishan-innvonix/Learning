import sgMail from "@sendgrid/mail";
import { SendMailMessage } from "../types/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export const sendMail = async (to: string, subject: string, html: string): Promise<void> => {
  const msg: SendMailMessage= {
    to,
    from: "madhuri.pamecha@innvonix.in",
    subject,
    html,
  };
  await sgMail.send(msg);
};