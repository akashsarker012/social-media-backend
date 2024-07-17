const express = require('express');
const router = express.Router();

const userRoute = require('./api/user');
const postRoute = require('./api/post');

const privateApi = process.env.PRIVATE_API; 

 router.use( privateApi, userRoute);
 router.use( privateApi, postRoute);

module.exports = router;
