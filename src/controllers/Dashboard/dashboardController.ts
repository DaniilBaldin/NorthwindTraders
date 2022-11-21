/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path: path.join(__dirname, '../', '/.env'),
});
import IP from 'ip';
const API_KEY = '993fbdff21894ce68d4098491b66e5f7';
const URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + API_KEY;

import logs from '../../models/logs';

const sendAPIRequest = async (ipAddress: any) => {
    const apiResponse = await axios.get(URL + '&ip_address=' + ipAddress);
    return apiResponse.data;
};

const dashboardController: RequestHandler = async (req, res) => {
    const IP_HEADERS = [
        'Forwarded',
        'Forwarded-For',
        'X-Forwarded',
        'X-Forwarded-For', // may contain multiple IP addresses in the format: 'client IP, proxy 1 IP, proxy 2 IP' - we use first one
        'X-Client-IP',
        'X-Real-IP', // Nginx proxy, FastCGI
        'X-Cluster-Client-IP', // Rackspace LB, Riverbed Stingray
        'Proxy-Client-IP',
        'CF-Connecting-IP', // Cloudflare
        'Fastly-Client-Ip', // Fastly CDN and Firebase hosting header when forwared to a cloud function
        'True-Client-Ip', // Akamai and Cloudflare
        'WL-Proxy-Client-IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP',
        'HTTP_CLIENT_IP',
        'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED',
        'HTTP_VIA',
        'REMOTE_ADDR',

        // you can add more matching headers here ...
    ];

    const getRequestIpAddress = (req: any) => {
        const headers = req.headers;
        for (const header of IP_HEADERS) {
            const value = headers[header];
            if (value) {
                const parts = value.split(/\s*,\s*/g);
                return parts[0] ?? null;
            }
        }
        const client = req.connection ?? req.socket ?? req.info;
        if (client) {
            return client.remoteAddress ?? null;
        }
        return null;
    };
    const ip = getRequestIpAddress(req);
    console.log(ip);
    // const ip = req.headers.host;
    // console.log(ip);
    // const ipAddress = IP.address('public');
    // const ipAddressInformation = await sendAPIRequest(ip);
    // console.log(ipAddressInformation);

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
                // geoData: geoData,
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
