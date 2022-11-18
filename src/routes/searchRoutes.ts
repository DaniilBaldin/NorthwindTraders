import { Router } from 'express';
import bodyParser from 'body-parser';

import searchController from '../controllers/Search/searchController';

const searchRouter = Router();

searchRouter.get('/search', searchController);

searchRouter.use(bodyParser.json());

export default searchRouter;
