// db.js
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "hackout",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
        return;
    }
});

module.exports = db;
