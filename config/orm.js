// Import (require) connection.js into orm.js

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.


// selectAll()
// insertOne()
// updateOne()


// Export the ORM object in module.exports.
var connection = require("../config/connection.js");
// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        console.log("inside objToSql", value)
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')  
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'"
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]  
            arr.push(key + "=" + value);   
        }
    }
     // translate array of strings to a single comma-separated string
    return arr.toString();
}

//Object for all our sql statements function
var orm = {
    all: function(tableInput, cb){
        var quertString = "SELECT * FROM " + tableInput + ";";
        connection.query(quertString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function ( table, cols, vals, cb) {
        var quertString = "INSERT INTO " + table;
        quertString += " (";
        quertString += cols.toString();
        quertString += ") ";
        quertString += "VALUES (";
        quertString += printQuestionMarks(vals.length);
        quertString += ") ";

        console.log(quertString);
        connection.query(quertString, vals, function(err, result){
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    update: function (table, objColVals, condition, cb) {
        var quertString = "UPDATE " + table;
        quertString += " SET ";
        quertString += objToSql(objColVals);
        quertString += " WHERE " ;
        quertString += condition;

        console.log("This is the query string:", quertString);
        connection.query(quertString, function(err, result){
            if (err){
                throw err
            }
            cb(result);
        });
    },

    delete: function (table, condition, cb) {
        var quertString = " DELETE FROM " + table + " WHERE " + condition;
        console.log(quertString);
        connection.query(quertString, function(err, result){
            if (err){
                throw err;
            }
            cd(result);
        });
    }
};
// Export the orm object for the model (cat.js).
module.exports = orm;