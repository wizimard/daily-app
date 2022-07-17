import mongoose from "mongoose";

const User = new mongoose.Schema({
    email: {type: String, unique: true ,required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    avatar: {type: String},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
});

export default mongoose.model('User', User);