const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  post:  [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
}],
  savedPost: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
}],
});

module.exports = mongoose.model('User', userSchema);
