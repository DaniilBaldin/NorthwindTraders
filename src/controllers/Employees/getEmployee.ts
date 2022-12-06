/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import employees from '../../models/employees';
import logs from '../../models/logs';
import * as q from '../../utils/queries';

const getEmployee: RequestHandler = async (req, res) => {
    const start = new Date().valueOf();
    const getEmployeeQuery = q.getEmployeeQuery;
    const EmployeeID: any = req.query.id;
    employees
        .getEmployee(EmployeeID)
        .then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.json({
                    error: {
                        message: 'No employees found.',
                    },
                    success: false,
                });
            } else {
                const end = new Date().valueOf() - start + 'ms';
                const result_count = resultParsed.length;
                const type = 'select_left';
                const date = new Date().toISOString();
                const database_name = 'heroku_6277cdda7c83006';
                await logs.save(result_count, type, date, database_name, end, getEmployeeQuery);
                if (resultParsed[0].ReportsTo === 'null') {
                    const person = resultParsed[0];
                    delete person.ReportsTo;
                    delete person.ReportId;
                    res.status(200).json({
                        data: person,
                        success: true,
                    });
                } else {
                    res.status(200).json({
                        data: resultParsed[0],
                        success: true,
                    });
                }
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
