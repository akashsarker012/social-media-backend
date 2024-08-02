const express = require('express');
const Post = require('../model/postSchema');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const userSchema = require('../model/userSchema')
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
async function postController(req, res, next) {
    try {
        const { description, image, owner } = req.body;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'uploads',
            });
            fs.unlinkSync(req.file.path);
            const newPost = new Post({
                description,
                owner,
                image: result.secure_url,
            });
            await newPost.save();
            const updatedUser = await userSchema.findOneAndUpdate(
                { _id: owner },
                { $push: { post: newPost._id } },
                { new: true } 
              );
            res.status(200).send(result.url + "Post created successfully");
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getAllPost(req, res, next) {
  try {
      const posts = await Post.find().populate('owner', 'name email profilepic followers following')

      res.status(200).send(posts);
  } catch (error) {
      res.status(500).send(error.message);
  }
}

  
  module.exports = { postController, getAllPost };
  
