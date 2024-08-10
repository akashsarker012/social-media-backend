const express = require('express');
const router = express.Router();

const userRoute = require('./api/user');
const postRoute = require('./api/post');

const privateApi = process.env.PRIVATE_API; 

 router.use( '/api/v1', userRoute);
 router.use( "/api/v1", postRoute);

module.exports = router;