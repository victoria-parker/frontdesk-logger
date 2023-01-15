const mongoose = require("mongoose")

const WakeUpCallSchema = new mongoose.Schema({
    roomNumber:{
        type: Number,
        required:true
    },
    wakeUpTime:{
        type: Date,
        required: true,
    },
    guestName:{
        type: String,
        required:true
    },
    observations:{
        type:String
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
    },
})

module.exports = mongoose.model("WakeUpCall", PostSchema);
