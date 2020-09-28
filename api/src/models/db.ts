//This file connect the database with api
const mysql = require("mysql");
const dbConfig = require("../config/db.config.ts");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

// open the MySQL connection
connection.connect((error:any) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;