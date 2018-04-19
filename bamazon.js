var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("It works")
    // run the start function after the connection is made to prompt the user
    // start();
});

// function updateData(product, quantity, productSale, message = "") {
//     console.log