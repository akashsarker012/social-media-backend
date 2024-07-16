const express = require("express");
// const userInfo = require("../model/userSchema");
const postSchema = require("../model/postSchema");

async function postController(req, res) {
    try {
        const { description, image } = req.body;

        const newPost = new postSchema({
            userId: "" ,
            description,
            image
        });
        await newPost.save();

        res.status(200).send("Post created successfully");

    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    }
}


module.exports = { postController };

