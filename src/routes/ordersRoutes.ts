import { Router } from 'express';
import bodyParser from 'body-parser';

import getAllOrders from '../controllers/Orders/getAllOrders';
import getOrder from '../controllers/Orders/getOrder';

const ordersRouter = Router();

ordersRouter.get('/orders', getAllOrders);
ordersRouter.get('/order', getOrder);

ordersRouter.use(bodyParser.json());

export default ordersRouter;
