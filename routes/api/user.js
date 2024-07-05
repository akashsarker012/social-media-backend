const express = require('express');
const { registration } = require('../../controller/registration');
const { loginController } = require('../../controller/loginController');
const router = express.Router();

// router.post('/sendotp', sendOTP);
// router.post('/verifyotp', verifyOTP);

router.post('/registration', registration);
router.post('/login', loginController);

module.exports = router;