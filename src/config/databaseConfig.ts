import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
    path: path.join(__dirname, '../', '/.env'),
});

export const DATA_SOURCES = {
    mysql: {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.USER_DB,
        DB_PASS: process.env.DB_PASSWORD,
        DATABASE: process.env.DATABASE,
    },
};
