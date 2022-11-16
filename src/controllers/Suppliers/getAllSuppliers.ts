/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import suppliers from '../../models/suppliers';

const getAllSuppliers: RequestHandler = async (req, res) => {
    const page: any = req.query.page;
    const limit = 20;
    const offset = (page - 1) * limit;
    const totalLength = await suppliers.getAll().then((result) => {
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        return resultParsed.length;
    });
    const totalPages = Math.ceil(totalLength / limit);
    console.log(totalPages);
    suppliers
        .getAllSuppliers(limit, offset)
        .then((result) => {
            res.status(200).json({
                data: {
                    items: limit,
                    page: parseInt(page),
                    pages: totalPages,
                    hasNextPage: limit * page < totalLength,
                    suppliers: result[0],
                },
                success: true,
            });
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