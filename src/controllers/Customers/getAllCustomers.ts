/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import customers from '../../models/customers';

const getAllCustomers: RequestHandler = async (req, res) => {
    const page: any = req.query.page;
    const limit = 20;
    const offset = (page - 1) * limit;
    const totalLength = await customers.getAll().then((result) => {
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        return resultParsed[0].total;
    });
    const totalPages = Math.ceil(totalLength / limit);
    customers
        .getAllCustomers(limit, offset)
        .then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.status(404).json({
                    error: {
                        message: 'No customers found.',
                    },
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: {
                        page: parseInt(page),
                        pages: totalPages,
                        hasNextPage: limit * page < totalLength,
                        suppliers: result[0],
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

export default getAllCustomers;
