const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_CMS",
});

db.connect((err) => {
  if (err) throw err;
});

module.exports = db;
