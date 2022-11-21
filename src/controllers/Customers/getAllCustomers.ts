/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import customers from '../../models/customers';
import logs from '../../models/logs';
import * as q from '../../utils/queries';

const getAllCustomers: RequestHandler = async (req, res) => {
    const totalLengthQuery = q.totalCustomersLengthQuery;
    const getAllCustomersQuery = q.getAllCustomersQuery;
    const start = new Date().valueOf();
    const page: any = req.query.page;
    const limit = 20;
    const offset = (page - 1) * limit;
    const totalLength = await customers.getAll().then(async (result) => {
        const end = new Date().valueOf() - start;
        const result_count = 1;
        const type = 'select';
        const date = new Date().toISOString();
        const database_name = 'heroku_6277cdda7c83006';
        await logs.save(result_count, type, date, database_name, end, totalLengthQuery);
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        return resultParsed[0].total;
    });
    const totalPages = Math.ceil(totalLength / limit);
    await customers
        .getAllCustomers(limit, offset)
        .then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.status(404).json({
                    error: {
                        message: 'No customers found.',
                    },
                    success: false,
                });
            } else {
                const end = new Date().valueOf() - start;
                const result_count = resultParsed.length;
                const type = 'select';
                const date = new Date().toISOString();
                const database_name = 'heroku_6277cdda7c83006';
                await logs.save(result_count, type, date, database_name, end, getAllCustomersQuery);
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
            return result;
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
