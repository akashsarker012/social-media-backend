const userInfo = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
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
        // res.cookie('userToken', user._id.toString(), { httpOnly: true });
        // console.log('Cookies received:', req.cookies);

        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name,
            profilepic: user.profilepic,
            verified: user.verified,
            followers: user.followers,
            following: user.following
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY_TOKEN, { expiresIn: '8h' });
        console.log("Token:", token);

        // Set token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            maxAge: 8 * 60 * 60 * 1000 // 8 hours expiry time in milliseconds
        });

        // Respond with success message and token
        return res.json({ token, message: 'Login successfully', success: true });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send(error.message);
    }
}

module.exports = { loginController }