import { RequestHandler } from 'express';

import Categories from '../../models/categories';

const getAllCategories: RequestHandler = async (req, res) => {
    try {
        Categories.getAll().then((result) => {
            res.status(200).json({
                data: result[0],
                success: true,
            });
        });
    } catch (err) {
        res.json({
            error: {
                message: (err as Error).message,
            },
            success: false,
        });
    }
};

export default getAllCategories;
