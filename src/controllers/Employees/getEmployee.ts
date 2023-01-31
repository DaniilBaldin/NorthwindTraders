/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import employees from '../../models/employees';
import * as q from '../../utils/queries';

const getEmployee: RequestHandler = async (req, res) => {
    const start = new Date().valueOf();
    const getEmployeeQuery = q.getEmployeeQuery;
    const EmployeeID: any = req.query.id;
    const first: any = {};
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
                first.type = type;
                first.duration = end;
                first.timestamp = date;
                first.database = database_name;
                first.query = getEmployeeQuery;
                if (resultParsed[0].ReportsTo === 'null') {
                    const person = resultParsed[0];
                    delete person.ReportsTo;
                    delete person.ReportId;
                    delete person.ReportFirstName;
                    delete person.ReportLastName;
                    res.status(200).json({
                        data: {
                            employee: person,
                            stats: {
                                queries: 1,
                                results: result_count,
                                logs: [first],
                            },
                        },
                        success: true,
                    });
                } else {
                    res.status(200).json({
                        data: {
                            employee: resultParsed[0],
                            stats: {
                                queries: 1,
                                results: result_count,
                                logs: first,
                            },
                        },
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
