import express from 'express';
import { MongoClient } from 'mongodb';
import router from './router';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
import * as fs from 'fs';

dotenv.config({ path: './DuoFind.env' });
/** creating new express app */
const app = express();

const mongoURI = process.env.DB_URI;

if (!mongoURI) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1); // Exit if URI is not set
}

const client = new MongoClient(mongoURI);

async function startServer() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('DuoFind'); // Replace with your database name
        app.use(cors({ credentials: true }));
        app.use(compression());
        app.use(cookieParser());
        app.use(bodyParser.json());

        const jwtCheck = auth({
            audience: 'http://localhost:3000',
            issuerBaseURL: 'https://dev-pyt4wix26nyx7hjt.us.auth0.com/',
            tokenSigningAlg: 'RS256'
        });
        app.use(jwtCheck)

        /** adding a basic options route and setting response header for all requests */
        // app.use((req, res, next) => {
        //     res.header('Access-Control-Allow-Origin', "*");

        //     res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

        //     if (req.method === 'OPTIONS') {
        //         res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT')
        //         return res.status(200).json({});
        //     }
        //     next();
        // });

        app.use('/', router());

        /** creating a error endpoint - this endpoint is called if no endpoint is found */
        app.use((req, res, next) => {
            const error = new Error('not found');
            return res.status(404).json({
                message: error.message
            });
        });

        // HTTPS server setup
        // const httpsOptions = {
        //     key: fs.readFileSync('path/to/key.pem'), // Replace with path to your key
        //     cert: fs.readFileSync('path/to/cert.pem') // Replace with path to your cert
        // };

        // Rest of your Express server setup...
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

startServer();

