/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import SearchFrom from '../../models/search';

const searchController: RequestHandler = async (req, res) => {
    const limit = 50;
    const search: any = req.query.q;
    const table = req.query.table;
    if (table === 'products') {
        SearchFrom.searchProducts(search, limit)
            .then((result) => {
                const resultParsed = JSON.parse(JSON.stringify(result[0]));
                if (!resultParsed[0]) {
                    res.json({
                        error: {
                            message: 'Nothing is found.',
                        },
                        success: false,
                    });
                } else {
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
    } else if (table === 'customers') {
        SearchFrom.searchCustomers(search, limit)
            .then((result) => {
                const resultParsed = JSON.parse(JSON.stringify(result[0]));
                if (!resultParsed[0]) {
                    res.json({
                        error: {
                            message: 'Nothing is found.',
                        },
                        success: false,
                    });
                } else {
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
    }
};

export default searchController;
