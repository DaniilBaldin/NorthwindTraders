import { Router } from 'express';
import bodyParser from 'body-parser';

import getAllProducts from '../controllers/Products/getAllProducts';
import getProduct from '../controllers/Products/getProduct';

const productsRouter = Router();

productsRouter.get('/products', getAllProducts);
productsRouter.get('/product', getProduct);

productsRouter.use(bodyParser.json());

export default productsRouter;
