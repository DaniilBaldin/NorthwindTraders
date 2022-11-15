import { Router } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import uploadCSV from '../utils/uploadCsv';
import upload from '../middlewares/uploaderMiddleware';

const uploadRouter = Router();

uploadRouter.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../', '../', '/public/index.html'));
});

uploadRouter.post('/import-csv', upload.single('import-csv'), (req) => {
    // console.log(req.file);
    uploadCSV(path.join(__dirname, '../', '/uploads/' + req.file?.filename));
    console.log('File was imported!');
});

uploadRouter.use(bodyParser.json());

export default uploadRouter;
