import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../', '/public')));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setTimeout(10000);
    next();
});

app.use(
    cors({
        origin: '*',
        methods: ['OPTIONS', 'GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Uppy-Versions',
            'Accept',
            'x-requested-with',
            'Access-Control-Allow-Origin',
        ],
        exposedHeaders: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.get('/', (req, res) => {
    res.send('Hello there! General Kenobi!');
});

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
