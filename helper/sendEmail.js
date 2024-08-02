// helper/sendEmail.js
const nodemailer = require("nodemailer");

async function sendEmail(email, subject, template) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "akashsarkeronline@gmail.com",
        pass: "scqycqoodtlijrqi",
      },
    });

    const info = await transporter.sendMail({
      from: '"Orebi-ecommerce" <akashsarkeronline@gmail.com>',
      to: email,
      subject: subject,
      html: template,
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP");
  }
}

module.exports = sendEmail;
