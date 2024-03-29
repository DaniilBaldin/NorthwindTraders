/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path: path.join(__dirname, '../', '/.env'),
});
const API_KEY = process.env.API_KEY;
const URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + API_KEY;

const sendAPIRequest = async (ipAddress: any) => {
    const apiResponse = await axios.get(URL + '&ip_address=' + ipAddress);
    return apiResponse.data;
};

const dashboardController: RequestHandler = async (req, res) => {
    const ip = req.ip;
    console.log(ip);
    const ipAddressInformation = await sendAPIRequest(ip);
    console.log(ipAddressInformation);
    res.status(200).json({
        data: {
            geoData: ipAddressInformation,
        },
        success: true,
    });
    // logs.getAllLogs()
    //     .then(async (result) => {
    //         const resultParsed = JSON.parse(JSON.stringify(result[0]));
    //         let select = 0;
    //         let select_where = 0;
    //         let select_left = 0;
    //         let result_count = 0;
    //         let query_count = 0;
    //         resultParsed.forEach((e: any) => {
    //             result_count = result_count + parseInt(e.result_count);
    //             switch (true) {
    //                 case e.type === 'select':
    //                     select = select + 1;
    //                     query_count = query_count + 1;
    //                     break;
    //                 case e.type === 'select_where':
    //                     select_where = select_where + 1;
    //                     query_count = query_count + 1;
    //                     break;
    //                 case e.type === 'select_left':
    //                     select_left = select_left + 1;
    //                     query_count = query_count + 1;
    //                     break;
    //             }
    //         });

    //     })
    //     .catch((err) => {
    //         res.json({
    //             error: {
    //                 message: (err as Error).message,
    //             },
    //             success: false,
    //         });
    //     });
};

export default dashboardController;
