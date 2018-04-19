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

function displayProducts() {
    connection.query("SELECT * FROM items", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log(`${results[i].item_id}. Product: ${results[i].product_name},Department:${results[i].department_name}, Listed Price:${results[i].price}, In stock:${results[i].stock_quantity}`);
        }
    });
    start();
}
function start() {
    connection.query("SELECT * FROM items", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "selection",
                type: "list",
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

                if (selectedItem.stock_quantity >= parseInt(answer.quantity)) {

                    connection.query(
                        "UPDATE items SET ? WHERE ?", [{
                            stock_quantity: (selectedItem.stock_quantity - answer.quantity)
                        },
                        {
                            item_id: selectedItem.item_id
                        }
                        ],
                        function (error) {
                            if (error) throw error;
                            console.log("Order placed!")
                            console.log("Item(s) Purchased:" + selectedItem.product_name);
                            console.log("Total price: $" + parseFloat(answer.quantity * selectedItem.price).toFixed(2));
                        }
                    );
                }
                else {
                    console.log("Not enough in stock!");
                    start();
                }
            });
    });

}
displayProducts();