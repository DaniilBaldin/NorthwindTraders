/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import SearchFrom from '../../models/search';
import * as q from '../../utils/queries';

const searchController: RequestHandler = async (req, res) => {
    const start = new Date().valueOf();
    const searchProductsQuery = q.searchProductsQuery;
    const searchCustomersQuery = q.searchCustomersQuery;
    const limit = 50;
    const search: any = req.query.q;
    const table = req.query.table;
    const first: any = {};
    const second: any = {};
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
                    const end = new Date().valueOf() - start + 'ms';
                    const result_count = resultParsed.length;
                    const type = 'select_where';
                    const date = new Date().toISOString();
                    const database_name = 'heroku_6277cdda7c83006';
                    first.type = type;
                    first.duration = end;
                    first.timestamp = date;
                    first.database = database_name;
                    first.query = searchProductsQuery;
                    res.status(200).json({
                        data: {
                            search: resultParsed,
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
                    const end = new Date().valueOf() - start + 'ms';
                    const result_count = resultParsed.length;
                    const type = 'select_where';
                    const date = new Date().toISOString();
                    const database_name = 'heroku_6277cdda7c83006';
                    second.type = type;
                    second.duration = end;
                    second.timestamp = date;
                    second.database = database_name;
                    second.query = searchCustomersQuery;
                    res.status(200).json({
                        data: {
                            search: resultParsed,
                            stats: {
                                queries: 1,
                                results: result_count,
                                logs: second,
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
