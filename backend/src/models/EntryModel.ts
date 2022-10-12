import mongoose from "mongoose";

export interface IEntry extends mongoose.Document {
    author: mongoose.Schema.Types.ObjectId;
    date: Date;
    title: string;
    content: string;
    notes?: string;
    images: string[];
}

const Entry = new mongoose.Schema<IEntry>({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    notes: {type: String, required: false, default: ''},
    images: {type: [String], required: true, default: []}
}, {
    collection: 'entries',
    timestamps: true
});

export default mongoose.model<IEntry>('entries', Entry);