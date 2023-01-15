const mongoose = require("mongoose")

const IssueSchema = new mongoose.Schema({
    roomNumber:{
        type: Number,
        required:true
    },
    guestName:{
        type: String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    resolved:{
        type:Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    company:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Issue", PostSchema);