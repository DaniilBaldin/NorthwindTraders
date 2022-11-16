/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';

import orders from '../../models/orders';

const getOrder: RequestHandler = async (req, res) => {
    const OrderID: any = req.query.id;
    const orderDetails = await orders.getOrderDetails(OrderID);
    orders
        .getOrder(OrderID)
        .then((result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            if (!resultParsed[0]) {
                res.json({
                    error: {
                        message: 'No orders found.',
                    },
                    success: false,
                });
            } else {
                res.status(200).json({
                    order: resultParsed[0],
                    products: orderDetails[0],
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
