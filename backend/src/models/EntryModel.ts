import mongoose from "mongoose";

const Entry = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    notes: {type: String, required: true},
    images: {type: [String], required: true, default: []}
}, {
    collection: 'entries',
    timestamps: true
});

export default mongoose.model('entries', Entry);