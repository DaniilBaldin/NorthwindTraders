/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import * as csv from 'fast-csv';
import db from './databaseConnect';

const uploadCSV = (file: any) => {
    const stream = fs.createReadStream(file);
    const csvData: any[] = [];
    const fileStream = csv
        .parse()
        .on('data', (data) => {
            csvData.push(data);
        })
        .on('end', () => {
            csvData.shift();
            const query = `INSERT INTO regions (RegionID, RegionDescription) VALUES ?`;
            db.query(query, [csvData]);
            fs.unlinkSync(file);
        });
    stream.pipe(fileStream);
};

export default uploadCSV;
