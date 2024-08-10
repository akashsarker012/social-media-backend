const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the comment schema
const commentSchema = new Schema({
    description: {
        type: String,
        default: ""
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const postSchema = new Schema({
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comment: [commentSchema],
    created: {
        type: Date,
        default: new Date()
    },
    update: {
        type: Date
    },
});

module.exports = mongoose.model('Post', postSchema);
