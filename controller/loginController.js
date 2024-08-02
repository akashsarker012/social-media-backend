const userInfo = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.send({ error: "Email is required" });
  }
  if (!password) {
    return res.send({ error: "Please enter your password" });
  }

  try {
    const existingUser = await userInfo.findOne({ email });

    if (!existingUser) {
      return res.json({ error: "Email is not registered" });
    }
    if (!existingUser.verified) {
      return res.json({ error: "Please verify your email before logging in", verified: false });
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return res.json({ error: "Incorrect password" });
    }
    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
      profilepic: existingUser.profilepic,
      verified: existingUser.verified,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY_TOKEN, {
      expiresIn: "8h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      maxAge: 8 * 60 * 60 * 1000, 
    });

    return res.json({ token, message: "Login successfully", success: true });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while logging in" });
  }
}

module.exports = loginController;
