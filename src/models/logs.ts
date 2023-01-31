import db from '../utils/databaseConnect';

// const logs = class Logs {
//     id: string;
//     result_count: number;
//     type: string;
//     date: string;
//     database_name: string;
//     time_passed: string;
//     query: string;
//     constructor(
//         id: string,
//         result_count: number,
//         type: string,
//         date: string,
//         database_name: string,
//         time_passed: string,
//         query: string
//     ) {
//         this.id = id;
//         this.result_count = result_count;
//         this.type = type;
//         this.date = date;
//         this.database_name = database_name;
//         this.time_passed = time_passed;
//         this.query = query;
//     }
//     static save(
//         result_count: number,
//         type: string,
//         date: string,
//         database_name: string,
//         time_passed: string,
//         query: string
//     ) {
//         return db.execute(
//             'INSERT INTO logs (result_count, type, date, database_name, time_passed, query) VALUES (?, ?, ?, ?, ?, ?)',
//             [result_count, type, date, database_name, time_passed, query]
//         );
//     }
//     static getAllLogs() {
//         return db.execute('SELECT * FROM logs ORDER BY id DESC LIMIT 20');
//     }
// };

// export default logs;
