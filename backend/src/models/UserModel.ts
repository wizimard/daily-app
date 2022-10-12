import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    username: string;
    avatar?: string;
    isConfirm: boolean;
    confirmLink: string;
}

const User = new mongoose.Schema<IUser>({
    email: {type: String, unique: true ,required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    avatar: {type: String},
    isConfirm: {type: Boolean, default: false},
    confirmLink: {type: String}
});

export default mongoose.model<IUser>('User', User);