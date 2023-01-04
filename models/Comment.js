const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({  
    text:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
    },
    organization:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Comment", PostSchema);