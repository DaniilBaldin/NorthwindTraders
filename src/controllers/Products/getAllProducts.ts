/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import products from '../../models/products';
import * as q from '../../utils/queries';

const getAllProducts: RequestHandler = async (req, res) => {
    const totalLengthQuery = q.totalProductsLengthQuery;
    const getAllProductsQuery = q.getAllProductsQuery;
    const start = new Date().valueOf();
    const page: any = req.query.page;
    const limit = 20;
    const offset = (page - 1) * limit;
    const first: any = {};
    const second: any = {};
    let counter = 0;
    const totalLength = await products.getAll().then(async (result) => {
        const end = new Date().valueOf() - start + 'ms';
        const result_count = 1;
        const type = 'select';
        const date = new Date().toISOString();
        const database_name = 'heroku_6277cdda7c83006';
        counter = counter + result_count;
        first.type = type;
        first.duration = end;
        first.timestamp = date;
        first.database = database_name;
        first.query = totalLengthQuery;
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        return resultParsed[0].total;
    });
    const totalPages = Math.ceil(totalLength / limit);
    products
        .getAllProducts(limit, offset)
        .then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.status(404).json({
                    error: {
                        message: 'No products found.',
                    },
                    success: false,
                });
            } else {
                const end = new Date().valueOf() - start + 'ms';
                counter = counter + resultParsed.length;
                const type = 'select';
                const date = new Date().toISOString();
                const database_name = 'heroku_6277cdda7c83006';
                second.type = type;
                second.duration = end;
                second.timestamp = date;
                second.database = database_name;
                second.query = getAllProductsQuery;
                res.status(200).json({
                    data: {
                        page: parseInt(page),
                        pages: totalPages,
                        hasNextPage: limit * page < totalLength,
                        products: result[0],
                        stats: {
                            queries: 2,
                            results: counter,
                            logs: [first, second],
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

export default getAllProducts;
