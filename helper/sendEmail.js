const nodemailer = require("nodemailer");

async function sendEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "akashsarkeronline@gmail.com", // Your email address
        pass: "scqycqoodtlijrqi", // Your email password
      },
    });

    const mailOptions = {
      from: "akashsarkeronline@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true; 
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP");
  }
}

module.exports = sendEmail;
