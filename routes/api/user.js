const express = require('express');
const { registration } = require('../../controller/registration');
const { loginController } = require('../../controller/loginController');
const { verifyToken } = require('../../controller/verifyToken');
const router = express.Router();

router.post('/registration', registration);
router.post('/login', loginController);
// router.get('/currentuser', loginController);

router.get('/current-user', verifyToken);

module.exports = router;