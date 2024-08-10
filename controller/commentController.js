const postSchema = require('../model/postSchema');
const userSchema = require('../model/userSchema');
 const commentController = async (req, res) => {
    try {
        const { description, postId, userId } = req.body;
        const payload = {
            description,
            userId,
            postId
        };

        await postSchema.updateOne({ _id: postId }, {
            $push: { comment: payload },
        });

        const commentList = await postSchema.find({ _id: postId }).populate({
            path: 'comment',
            populate: {
                path: 'userId',
            },
        });

        return res.send({
            message: "Comment This Post successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {commentController}