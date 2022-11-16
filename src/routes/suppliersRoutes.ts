import { Router } from 'express';
import bodyParser from 'body-parser';

import getAllSuppliers from '../controllers/Suppliers/getAllSuppliers';
import getSupplier from '../controllers/Suppliers/getSupplier';

const suppliersRouter = Router();

suppliersRouter.get('/suppliers', getAllSuppliers);
suppliersRouter.get('/supplier/:id', getSupplier);

suppliersRouter.use(bodyParser.json());

export default suppliersRouter;
