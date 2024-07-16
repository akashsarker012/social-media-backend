const express = require('express');
const router = express.Router();

const userRoute = require('./api/user');
const postRoute = require('./api/post');


 router.use( '/api/v1', userRoute);
 router.use( '/api/v1', postRoute);

module.exports = router;
