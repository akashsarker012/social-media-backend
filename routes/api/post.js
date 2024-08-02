const express = require('express');
const { postController, getAllPost } = require('../../controller/postController');
const { getCurrentUser } = require('../../controller/getCurrentUser');
const upload = require('../../helper/fileUpload');

const router = express.Router();

router.post('/post', upload.single('image'), postController);
router.get('/get-allpost', getAllPost);

module.exports = router;