/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import suppliers from '../../models/suppliers';

const getSupplier: RequestHandler = async (req, res) => {
    const supplierID: any = req.query.id;
    suppliers
        .getSupplier(supplierID)
        .then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.json({
                    error: {
                        message: 'No suppliers found.',
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

export default getSupplier;