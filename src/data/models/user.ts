import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter username"],
    },
    email: {
        type: String,
        required: [true, "Please provide login email"],
        unique:true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },

}, {
    autoCreate: true,
    autoIndex: true
})
const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;



