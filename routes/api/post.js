const express = require('express');
const { postController } = require('../../controller/postController');
const fileUpload = require('../../helper/fileUpload');

const router = express.Router();

router.post('/post', fileUpload, postController);

module.exports = router;