/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import products from '../../models/products';

const getAllProducts: RequestHandler = async (req, res) => {
    const page: any = req.query.page;
    const limit = 20;
    const offset = (page - 1) * limit;
    const totalLength = await products.getAll().then((result) => {
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        return resultParsed[0].total;
    });
    const totalPages = Math.ceil(totalLength / limit);
    products
        .getAllProducts(limit, offset)
        .then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.status(404).json({
                    error: {
                        message: 'No products found.',
                    },
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: {
                        page: parseInt(page),
                        pages: totalPages,
                        hasNextPage: limit * page < totalLength,
                        products: result[0],
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
