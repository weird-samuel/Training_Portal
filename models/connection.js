const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});

connection.connect((err) => console.log(err || 'Database Connected'))

module.exports = connection.promise()