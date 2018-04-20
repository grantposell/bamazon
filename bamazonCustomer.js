//Attaching inquirer and mysql npm packages.
var inquirer = require('inquirer');
var mysql = require('mysql');

//Setup the connection to the MYSQL Database
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_DB"
});

//Connecting to the MySQL Server and SQL database
connection.connect(function (err) {
    if (err) throw err;
    // console.log("It works")

});
//display products function to show the products from the mysql database
function displayProducts() {
    connection.query("SELECT * FROM items", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(`${results[i].item_id}. Product: ${results[i].product_name},Department:${results[i].department_name}, Listed Price:${results[i].price}, In stock:${results[i].stock_quantity}`);
        }
    });
//The start function runs the prompt and asks the customer what items they would like to buy. 
    start();
}
function start() {
    connection.query("SELECT * FROM items", function (err, results) {
        if (err) throw err;
        //Initiating the inquirer prompt
        inquirer
            .prompt([{
                name: "selection",
                type: "list",
                //Listing out the item ids to be selected by the customer
                choices: function () {
                    var selectionArray = [];
                    for (var i = 0; i < results.length; i++) {
                        selectionArray.push("" + results[i].item_id);
                    }
                    return selectionArray;
                },
                message: "Insert the ID of the product you would like to purchase?"
            },
            {
                //Prompt awaiting for a number input from the user
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?",
                validate: function validateInput(value) {
                    if (isNaN(value) === false && value != "") {
                        return true;
                    }
                    return false;
                }
            }
            ])
            .then(function (answer) {
                var selectedItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.selection)) {
                        selectedItem = results[i];
                    }
                }
                //Checking to see if stock quantity is more than the requested amount
                if (selectedItem.stock_quantity >= parseInt(answer.quantity)) {

                    connection.query(
                        "UPDATE items SET ? WHERE ?", [{
                            //Updating the database's stock by subtracting the requested amount from the existing amount
                            stock_quantity: (selectedItem.stock_quantity - answer.quantity)
                        },
                        {
                            item_id: selectedItem.item_id
                        }
                        ],
                        //A callback to throw an error if there is an issue with the connection of the database and consoling out what has been ordered. 
                        function (error) {
                            if (error) throw error;
                            console.log("Order placed!")
                            console.log("Item(s) Purchased:" + selectedItem.product_name);
                            console.log("Total price: $" + parseFloat(answer.quantity * selectedItem.price).toFixed(2));
                        }
                    );
                }
                //A callback to display if there aren't enough in stock and returns to original prompt via the start function
                else {
                    console.log("Not enough in stock!");
                    start();
                }
            });
    });

}
displayProducts();