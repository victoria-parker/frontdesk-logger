const mongoose = require("mongoose")

const TaxiSchema = new mongoose.Schema({
    roomNumber:{
        type: Number,
        required:true
    },
    pickUpTime:{
        type: Date,
        required: true,
    },
    bookingNumber:{
        type: Number,
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
    organization:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Taxi", PostSchema);
