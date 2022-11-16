import { RequestHandler } from 'express';

import suppliers from '../../models/suppliers';

const getAllSuppliers: RequestHandler = async (req, res) => {
    suppliers
        .getAll()
        .then((result) => {
            res.status(200).json({
                data: result[0],
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
