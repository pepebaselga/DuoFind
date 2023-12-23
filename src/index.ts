import express, {Express} from 'express';
import router from './router';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

/** creating new express app */
const app = express();

/** adding some simple options, just for how requests are handled */
app.use(cors({
    credentials: true,
  }));
  
app.use(compression());

app.use(cookieParser());

app.use(bodyParser.json());

/** adding a basic options route and setting response header for all requests */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");

    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT')
        return res.status(200).json({});
    }
    next();
});

app.use('/', router());

/** creating a error endpoint - this endpoint is called if no endpoint is found */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** serving the serve, go to http://localhost:3000 */
const httpServer = http.createServer(app);
const PORT: any = 3000
httpServer.listen(PORT, () => console.log(`Server is now running on port ${PORT}.`))