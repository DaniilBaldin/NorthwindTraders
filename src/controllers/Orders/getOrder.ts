/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import orders from '../../models/orders';
import * as q from '../../utils/queries';

const getOrder: RequestHandler = async (req, res) => {
    const start = new Date().valueOf();
    const getOrderQuery = q.getOrderQuery;
    const getOrderDetailsQuery = q.getOrderDetailsQuery;
    const OrderID: any = req.query.id;
    const first: any = {};
    const second: any = {};
    let counter = 0;
    const orderDetails = await orders.getOrderDetails(OrderID).then(async (result) => {
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        const end = new Date().valueOf() - start + 'ms';
        const result_count = resultParsed.length;
        const type = 'select_where';
        const date = new Date().toISOString();
        const database_name = 'heroku_6277cdda7c83006';
        counter = counter + result_count;
        first.type = type;
        first.duration = end;
        first.timestamp = date;
        first.database = database_name;
        first.query = getOrderDetailsQuery;
        return resultParsed;
    });
    orders
        .getOrder(OrderID)
        .then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.json({
                    error: {
                        message: 'No orders found.',
                    },
                    success: false,
                });
            } else {
                const end = new Date().valueOf() - start + 'ms';
                counter = counter + resultParsed.length;
                const type = 'select_where';
                const date = new Date().toISOString();
                const database_name = 'heroku_6277cdda7c83006';
                second.type = type;
                second.duration = end;
                second.timestamp = date;
                second.database = database_name;
                second.query = getOrderQuery;
                res.status(200).json({
                    data: {
                        order: resultParsed[0],
                        products: orderDetails,
                        stats: {
                            queries: 2,
                            results: counter,
                            logs: [first, second],
                        },
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

export default getOrder;
