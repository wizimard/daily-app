import mongoose from "mongoose";

export interface ITodo {
    id: string;
    content: string;
    isDone: boolean;
    todos?: ITodo[];
}

export interface ITask extends mongoose.Document {
    author: mongoose.Schema.Types.ObjectId;
    date_start: Date;
    date_end: Date;
    title: string;
    description: string;
    todos: ITodo[];
}
const Todo = new mongoose.Schema<ITodo>({
    id: {type: String, required: true},
    content: {type: String, required: true},
    isDone: {type: Boolean, required: true, default: false},
    todos: {type: [this], required: true, default: false}
});

const Task = new mongoose.Schema<ITask>({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date_start: {type: Date, required: true },
    date_end: {type: Date, required: true },
    title: {type: String, required: true },
    description: {type: String, required: true },
    todos: {type: [Todo], required: true, default: [] },
}, {
    collection: 'tasks',
    timestamps: true
});

export default mongoose.model<ITask>('tasks', Task);