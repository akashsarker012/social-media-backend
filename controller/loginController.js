const express = require("express");
const userInfo = require("../model/userSchema");
const bcrypt = require('bcryptjs');

async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        // Check if user exists
        const user = await userInfo.findOne({ email });
        if (!user) {
            return res.status(400).send("User doesn't exist");
        }

        // Check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send("Password doesn't match");
        }

        // Check if email is verified
        if (!user.verified) {
            return res.status(400).send("Please verify your email");
        }

        // Login successful
        return res.status(200).send("Login successful");

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send(error.message);
    }
}

module.exports = { loginController };
