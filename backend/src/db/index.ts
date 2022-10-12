import mongoose from "mongoose";

import { DB_URL } from '../constants';

if (!DB_URL) {
    console.log(".env file doesn't include DB_URL");
    process.exit();
}

export async function connectDb() {
    await mongoose.connect(DB_URL);

    console.log('mongodb connected');
}


