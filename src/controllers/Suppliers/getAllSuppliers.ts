/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import suppliers from '../../models/suppliers';
import logs from '../../models/logs';
import * as q from '../../utils/queries';

const getAllSuppliers: RequestHandler = async (req, res) => {
    const totalLengthQuery = q.totalSuppliersLengthQuery;
    const getAllSuppliersQuery = q.getAllSuppliersQuery;
    const start = new Date().valueOf();
    const page: any = req.query.page;
    const limit = 20;
    const offset = (page - 1) * limit;
    const totalLength = await suppliers.getAll().then(async (result) => {
        const end = (new Date().valueOf() - start) / 1000;
        const result_count = 1;
        const type = 'select';
        const date = new Date().toISOString();
        const database_name = 'heroku_6277cdda7c83006';
        await logs.save(result_count, type, date, database_name, end, totalLengthQuery);
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        return resultParsed[0].total;
    });
    const totalPages = Math.ceil(totalLength / limit);
    suppliers
        .getAllSuppliers(limit, offset)
        .then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.status(404).json({
                    error: {
                        message: 'No suppliers found.',
                    },
                    success: false,
                });
            } else {
                const end = (new Date().valueOf() - start) / 1000;
                const result_count = resultParsed.length;
                const type = 'select';
                const date = new Date().toISOString();
                const database_name = 'heroku_6277cdda7c83006';
                await logs.save(result_count, type, date, database_name, end, getAllSuppliersQuery);
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

export default getAllSuppliers;
