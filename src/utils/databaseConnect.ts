import mysql from 'mysql2';
import { DATA_SOURCES } from '../config/databaseConfig';
const dataSource = DATA_SOURCES.mysql;

const initDB = mysql.createPool({
    host: dataSource.DB_HOST,
    user: dataSource.DB_USER,
    database: dataSource.DATABASE,
    password: dataSource.DB_PASS,
});

export default initDB.promise();
