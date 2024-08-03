const postSchema = require('../model/postSchema');
const userSchema = require('../model/userSchema');

const likeController = async (req, res) => {

    try {
        const { postId, userId } = req.body;

        const post = await postSchema.findById(postId);
        const user = await userSchema.findById(userId);
        if (post.like.includes(userId)) {
            await post.updateOne({ $pull: { like: userId } });
            await user.updateOne({ $pull: { like: postId } });
            res.status(200).json("The post has been disliked");
        } else {
            await post.updateOne({ $push: { like: userId } });
            await user.updateOne({ $push: { like: postId } });
            res.status(200).json("The post has been liked");
        }
    } catch (error) {
        res.status(500).json(error);    
    }
}


module.exports = { likeController }