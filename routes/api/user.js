const express = require('express');
const { registration } = require('../../controller/registration');
const { getCurrentUser } = require('../../controller/getCurrentUser');
const loginController = require('../../controller/loginController');
const userSchema = require('../../model/userSchema');
const { verify } = require('../../controller/otpController');
const router = express.Router();

router.post('/registration', registration);
router.post('/login', loginController);
router.post("/verify-otp", verify);
router.get('/current-user', getCurrentUser, (req, res) => {
     const currentUser = req.user;
        res.json({ currentUser, message: "current user" });
});

module.exports = router;