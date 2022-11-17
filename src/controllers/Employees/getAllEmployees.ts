/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import employees from '../../models/employees';

const getAllEmployees: RequestHandler = async (req, res) => {
    const page: any = req.query.page;
    let items: any;
    const limit = 20;
    const offset = (page - 1) * limit;
    const totalLength = await employees.getAll().then((result) => {
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        return resultParsed[0].total;
    });
    const totalPages = Math.ceil(totalLength / limit);
    if (totalLength > limit) {
        items = limit;
    } else {
        items = totalLength;
    }
    employees
        .getAllEmployees(limit, offset)
        .then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.status(404).json({
                    error: {
                        message: 'No employees found.',
                    },
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: {
                        items: items,
                        page: parseInt(page),
                        pages: totalPages,
                        hasNextPage: limit * page < totalLength,
                        orders: result[0],
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

export default getAllEmployees;
