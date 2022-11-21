import { Router } from 'express';
import bodyParser from 'body-parser';

import dashboardController from '../controllers/Dashboard/dashboardController';

const dashboardRouter = Router();

dashboardRouter.get('/dashboard', dashboardController);

dashboardRouter.use(bodyParser.json());

export default dashboardRouter;
