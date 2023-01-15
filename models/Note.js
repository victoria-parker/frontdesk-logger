const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    company:{
        type:String,
        required:true
    },
    resolved:{
        type:Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Note", NoteSchema);