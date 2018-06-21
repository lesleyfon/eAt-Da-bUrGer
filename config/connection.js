// Create a connection.js file inside config directory.
// Inside the connection.js file, setup the code to connect Node to MySQL.
// Export the connection.
// Set up MySQL connection.
// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "6sept1993",
//   database: "burgers_db"
// });

// // Make connection.
// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

var mysql = require('mysql');
var connection;
var JAWSDB_URL = "mysql://q6h0nxia4o2voryh:rdwn5wx7c4dajbuy@g3v9lgqa8h5nq05o.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/jzwa2tden1v6e4t7";



if ( process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "6sept1993",
  database: "burgers_db"
      });
}

// Export connection for our ORM to use.
module.exports = connection;
