import { Router } from 'express';
import bodyParser from 'body-parser';

import getAllCustomers from '../controllers/Customers/getAllCustomers';
import getCustomer from '../controllers/Customers/getCustomer';

const customersRouter = Router();

customersRouter.get('/customers', getAllCustomers);
customersRouter.get('/customer', getCustomer);

customersRouter.use(bodyParser.json());

export default customersRouter;
