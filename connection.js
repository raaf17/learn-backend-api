const mysql = require('mysql');
const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password : "",
  database: "phpmvc"
});

module.exports = db;