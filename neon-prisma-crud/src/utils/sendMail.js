import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (to, subject, html) => {
  const msg = {
    to,
    from: "madhuri.pamecha@innvonix.in",
    subject,
    html,
  };
  await sgMail.send(msg);
};