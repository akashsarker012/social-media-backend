const express = require('express');
const { registration } = require('../../controller/registration');
const { loginController } = require('../../controller/loginController');
const { getCurrentUser } = require('../../controller/getCurrentUser');
const router = express.Router();

router.post('/registration', registration);
router.post('/login', loginController);
// router.get('/currentuser', loginController);

router.get('/current-user', getCurrentUser);

module.exports = router;