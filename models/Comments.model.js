
const { Schema, model } = require("mongoose")



const commentSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            minlength: 100,
        }
    })



const Comment = model("Comment", commentSchema)
module.exports = Comment