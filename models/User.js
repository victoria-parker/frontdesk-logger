const mongoose=require("mongoose")

const UserSchema= new mongoose.Schema(
    {
        firstName: { type: String, unique: true },
        lastName: { type: String, unique: true },
        email: { type: String, unique: true },
        password: String,
        admin: { type: Boolean, default:false},
        organization: { type: String },
}
)