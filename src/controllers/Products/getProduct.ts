/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import products from '../../models/products';
import * as q from '../../utils/queries';

const getProduct: RequestHandler = async (req, res) => {
    const start = new Date().valueOf();
    const getProductQuery = q.getProductQuery;
    const ProductID: any = req.query.id;
    const first: any = {};
    products
        .getProduct(ProductID)
        .then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.json({
                    error: {
                        message: 'No products found.',
                    },
                    success: false,
                });
            } else {
                const end = new Date().valueOf() - start + 'ms';
                const result_count = resultParsed.length;
                const type = 'select_where';
                const date = new Date().toISOString();
                const database_name = 'heroku_6277cdda7c83006';
                first.type = type;
                first.duration = end;
                first.timestamp = date;
                first.database = database_name;
                first.query = getProductQuery;
                res.status(200).json({
                    data: {
                        product: resultParsed[0],
                        stats: {
                            queries: 1,
                            results: result_count,
                            logs: first,
                        },
                    },
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
