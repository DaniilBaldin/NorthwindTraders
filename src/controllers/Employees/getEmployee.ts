/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import employees from '../../models/employees';

const getEmployee: RequestHandler = async (req, res) => {
    const EmployeeID: any = req.query.id;
    employees
        .getEmployee(EmployeeID)
        .then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.json({
                    error: {
                        message: 'No employees found.',
                    },
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: {
                        employee: resultParsed[0],
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

export default getEmployee;
