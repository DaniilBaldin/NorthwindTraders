/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import products from '../../models/products';

const getProduct: RequestHandler = async (req, res) => {
    const ProductID: any = req.query.id;
    products
        .getProduct(ProductID)
        .then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.json({
                    error: {
                        message: 'No products found.',
                    },
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: resultParsed[0],
                    success: true,
                });
            }
        })
        .catch((err) => {
            res.json({
                error: {
                    message: (err as Error).message,
                },
                success: false,
            });
        });
};

export default getProduct;
