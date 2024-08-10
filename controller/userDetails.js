const userSchema = require("../model/userSchema");

const userDetails = async (req, res) => {
  try {
    const users = await userSchema
      .find()
      .populate("post")
      .select("-password -verified -email");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    const { currentUser, userId } = req.body;

    const targetUser = await userSchema.findById(userId);
    const userPerformingAction = await userSchema.findById(currentUser);

    if (!targetUser || !userPerformingAction) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userPerformingAction.following.includes(userId)) {
      await targetUser.updateOne({ $pull: { followers: currentUser } });
      await userPerformingAction.updateOne({ $pull: { following: userId } });
      res.status(200).json(`${userPerformingAction.name} has unfollowed ${targetUser.name}`);
    } else {
      await targetUser.updateOne({ $push: { followers: currentUser } });
      await userPerformingAction.updateOne({ $push: { following: userId } });
      res.status(200).json(`${userPerformingAction.name} has followed ${targetUser.name}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = followUnfollowUser;

module.exports = { userDetails, followUnfollowUser };
