import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDb } from "./db";

import router from './router/router';

import errorMiddleware from './middlewares/errorMiddleware';

import { CLIENT_URL, PORT } from './constants';

const app = express();

app.use(express.json());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

app.use('/api', router);

app.use(errorMiddleware);

const start = async() => {
    try {
        await connectDb();


        app.listen(PORT, () => {
            console.log('Server listening on the port ' + PORT);
        });

    } catch(e) {
        console.log(e);
        
    }
};

start();