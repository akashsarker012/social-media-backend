const express = require('express');
const Post = require('../model/postSchema');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const user = require("../controller/getCurrentUser")
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
async function postController(req, res, next) {
    try {
        const currentUser = req.user;
        const { description, image, owner } = req.body;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads',
            });
            fs.unlinkSync(req.file.path);
            const newPost = new Post({
                description,
                image: result.secure_url,
                owner : currentUser.id
            });
            await newPost.save();
            res.status(200).send(result.url + "Post created successfully");
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

 function getAllPost(req, res, next) {
    try {
        const posts = Post.find({}).populate("owner").populate("likes").populate("comments").populate("comments.owner");
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
    
 }

module.exports = { postController,getAllPost };
