const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema(
    {
        firstName: { 
            type: String,
        },
        lastName: { 
            type: String,
        },
        email: { 
            type: String, 
            unique: true 
        },
        admin: { 
            type: Boolean,
        },
        organization: { 
            type: String 
        },
        password: String,
}
)


module.exports = mongoose.model("User", UserSchema);