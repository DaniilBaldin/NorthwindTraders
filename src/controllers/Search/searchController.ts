/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import SearchFrom from '../../models/search';
import logs from '../../models/logs';
import * as q from '../../utils/queries';

const searchController: RequestHandler = async (req, res) => {
    const start = new Date().valueOf();
    const searchProductsQuery = q.searchProductsQuery;
    const searchCustomersQuery = q.searchCustomersQuery;
    const limit = 50;
    const search: any = req.query.q;
    const table = req.query.table;
    if (table === 'products' && search) {
        SearchFrom.searchProducts(search, limit)
            .then(async (result) => {
                const resultParsed = JSON.parse(JSON.stringify(result[0]));
                if (!resultParsed[0]) {
                    res.json({
                        error: {
                            message: 'Nothing is found.',
                        },
                        success: false,
                    });
                } else {
                    const end = (new Date().valueOf() - start) / 1000;
                    const result_count = resultParsed.length;
                    const type = 'select_where';
                    const date = new Date().toISOString();
                    const database_name = 'heroku_6277cdda7c83006';
                    await logs.save(result_count, type, date, database_name, end, searchProductsQuery);
                    res.status(200).json({
                        data: resultParsed,
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
    } else if (table === 'customers' && search) {
        SearchFrom.searchCustomers(search, limit)
            .then(async (result) => {
                const resultParsed = JSON.parse(JSON.stringify(result[0]));
                if (!resultParsed[0]) {
                    res.json({
                        error: {
                            message: 'Nothing is found.',
                        },
                        success: false,
                    });
                } else {
                    const end = (new Date().valueOf() - start) / 1000;
                    const result_count = resultParsed.length;
                    const type = 'select_where';
                    const date = new Date().toISOString();
                    const database_name = 'heroku_6277cdda7c83006';
                    await logs.save(result_count, type, date, database_name, end, searchCustomersQuery);
                    res.status(200).json({
                        data: resultParsed,
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
    } else if (!search) {
        res.json({
            error: {
                message: 'Empty search request.',
            },
            success: false,
        });
    } else {
        res.json({
            error: {
                message: 'Incorrect table name!',
            },
            success: false,
        });
    }
};

export default searchController;
