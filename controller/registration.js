const express = require("express");
const userInfo = require("../model/userSchema");
const { sendOTP } = require("./otpController");
var bcrypt = require('bcryptjs');

async function registration(req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userInfo.findOne({ email });
    if(existingUser) {
      return res.send("User already exists");
    }else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userInfo({ 
        name, 
        email, 
        password : hashedPassword
       });
  
      const otpResult = await sendOTP(email);
      await user.save(); 
  
      res.status(200).send("User created successfully");
    }

  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { registration };

