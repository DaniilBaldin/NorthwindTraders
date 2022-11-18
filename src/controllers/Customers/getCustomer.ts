/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import customers from '../../models/customers';

const getCustomer: RequestHandler = async (req, res) => {
    const CustomerID: any = req.query.id;
    customers
        .getCustomer(CustomerID)
        .then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.json({
                    error: {
                        message: 'No customers found.',
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

export default getCustomer;
