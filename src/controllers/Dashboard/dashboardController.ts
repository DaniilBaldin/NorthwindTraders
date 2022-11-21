/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path: path.join(__dirname, '../', '/.env'),
});

import logs from '../../models/logs';

const dashboardController: RequestHandler = async (req, res) => {
    const ip = req.socket.remoteAddress;
    console.log(ip);
    const geoData = await axios
        .get('https://ipgeolocation.abstractapi.com/v1/?api_key=993fbdff21894ce68d4098491b66e5f7')
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    // const options = {
    //     method: 'GET',
    //     url: ip,
    //     headers: {
    //         'X-RapidAPI-Key': process.env.RapidAPIKey,
    //         'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
    //     },
    // };
    // const geoData = await axios.request(options);
    logs.getAllLogs()
        .then(async (result) => {
            const resultParsed = JSON.parse(JSON.stringify(result[0]));
            let select = 0;
            let select_where = 0;
            let select_left = 0;
            let result_count = 0;
            resultParsed.forEach((e: any) => {
                result_count = result_count + parseInt(e.result_count);
                switch (true) {
                    case e.type === 'select':
                        select = select + 1;
                        break;
                    case e.type === 'select_where':
                        select_where = select_where + 1;
                        break;
                    case e.type === 'select_left':
                        select_left = select_left + 1;
                        break;
                }
            });
            res.status(200).json({
                geoData: geoData,
                data: {
                    select: select,
                    select_where: select_where,
                    select_left: select_left,
                    result_count: result_count,
                    logs: resultParsed.reverse(),
                },
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

export default dashboardController;