/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import orders from '../../models/orders';
import logs from '../../models/logs';
import * as q from '../../utils/queries';

const getOrder: RequestHandler = async (req, res) => {
    const start = new Date().valueOf();
    const getOrderQuery = q.getOrderQuery;
    const getOrderDetailsQuery = q.getOrderDetailsQuery;
    const OrderID: any = req.query.id;
    const orderDetails = await orders.getOrderDetails(OrderID).then(async (result) => {
        const resultParsed = JSON.parse(JSON.stringify(result[0]));
        const end = new Date().valueOf() - start + 'ms';
        const result_count = resultParsed.length;
        const type = 'select_where';
        const date = new Date().toISOString();
        const database_name = 'heroku_6277cdda7c83006';
        await logs.save(result_count, type, date, database_name, end, getOrderDetailsQuery);
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
                const result_count = resultParsed.length;
                const type = 'select_where';
                const date = new Date().toISOString();
                const database_name = 'heroku_6277cdda7c83006';
                await logs.save(result_count, type, date, database_name, end, getOrderQuery);
                res.status(200).json({
                    data: {
                        order: resultParsed[0],
                        products: orderDetails,
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
