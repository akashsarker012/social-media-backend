
const emailTemplate = require("../helper/emailTemplate");
const sendEmail = require("../helper/sendEmail");
const userSchema = require("../model/userSchema");

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
const verifyOTP = (email, otp) => {
  const storedOtp = otpMap.get(email);

  if (!storedOtp) {
    throw new Error("OTP has expired or does not exist.");
  }

  if (storedOtp === otp) {
    // otpMap.delete(email);
    return "OTP verified successfully";
  } else {
    throw new Error("Invalid OTP.");
  }
};

const verify = async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const result =  verifyOTP(email, otp);
    const updateUser = await userSchema.findOneAndUpdate(
      {email},
      {verified: true},
      {new: true}
     )
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = { sendOTP, verify };
