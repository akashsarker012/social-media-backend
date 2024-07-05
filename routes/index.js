const express = require('express');
const router = express.Router();

const userRoute = require('./api/user');


 router.use( '/api/v1', userRoute);

module.exports = router;
