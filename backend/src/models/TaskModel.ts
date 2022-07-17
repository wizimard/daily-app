import mongoose from "mongoose";

const Task = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date_start: {type: Date, required: true },
    date_end: {type: Date, required: true },
    title: {type: String, required: true },
    description: {type: String, required: true },
    todos: {type: [], required: true, default: [] },
}, {
    collection: 'tasks',
    timestamps: true
});

export default mongoose.model('tasks', Task);