const express = require('express');
const { postController } = require('../../controller/postController');
const fileUpload = require('../../helper/fileUpload');
const { getCurrentUser } = require('../../controller/getCurrentUser');

const router = express.Router();

router.post('/post',getCurrentUser, fileUpload, postController);

module.exports = router;