require("dotenv").config();
const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employee_db"
})

connection.connect( () => {
    console.log("Connected as " + connection.threadId);
});

connection.query = util.promisify(connection.query);

module.exports = connection;