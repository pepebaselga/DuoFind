import express from 'express';
import router from './router';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from 'express-oauth2-jwt-bearer';

const path = require('path');

export const checkJwt = auth({
    audience: 'http://localhost:3000',
    issuerBaseURL: 'https://dev-pyt4wix26nyx7hjt.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

dotenv.config({ path: './DuoFind.env' });
/** creating new express app */
const app = express();

const mongoURI = process.env.DB_URI;

if (!mongoURI) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1); // Exit if URI is not set
}


async function startServer() {
    try {

        app.use(cors({ credentials: true }));
        app.use(compression());
        app.use(cookieParser());
        app.use(bodyParser.json());

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        mongoose.Promise = Promise;
        mongoose.connect('mongodb+srv://admin:cQd83fa4Yyom1CIP@duofind.zefkpqz.mongodb.net/?retryWrites=true&w=majority')
            .then(() => console.log('Connected to database'));
        mongoose.connection.on('error', (error: Error) => console.log(error));

        app.use("/public", express.static('public'))

        app.use('/', router());

        app.use((req, res, next) => {
            const error = new Error('not found');
            return res.status(404).json({
                message: error.message
            });
        });

        // Rest of your Express server setup...
        
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

startServer();

