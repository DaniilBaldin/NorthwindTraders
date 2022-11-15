import { Router } from 'express';
import bodyParser from 'body-parser';

import getAllCategories from '../controllers/getAllCategories';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getAllCategories);

categoriesRouter.use(bodyParser.json());

export default categoriesRouter;
