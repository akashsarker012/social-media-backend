// backend\model\postSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    description : {
        type : String,
        default : ""
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    }
},{
    timestamps : true
})


const postSchema = new Schema({
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    userId: {
         type: String,
        default: ""
    },
    like: {
        type: Array,
        default: []
    },
    comment: [commentSchema]
}, {
    timestamps: true
});



 module.exports = mongoose.model("posts",postSchema)

