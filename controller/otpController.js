
const emailTemplate = require("../helper/emailTemplate");
const sendEmail = require("../helper/sendEmail");

const generateOTP = () => {
  const length = 6;
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

let otpMap = new Map();

const sendOTP = async (email) => {
  try {
    const otp = generateOTP();
    otpMap.set(email, otp);

    const subject = "OTP Verification";
    const template = emailTemplate(otp, email);

    await sendEmail(email, subject, template);

    return "OTP sent successfully";
  } catch (error) {
    throw new Error(`Error sending OTP: ${error.message}`);
  }
};

module.exports = { sendOTP };
