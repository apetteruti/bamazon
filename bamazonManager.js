var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var table = new Table({
    head: ["Item Id", "Product Name", "Price", "Quantity"],

    style: {
        head: ['white'],
        compact: false,
        colAligns: ["center"]
    }

});

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

function productsSale() {

    console.log("\n-----WELCOME TO BAMAZON!-----\n")
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            // console.log(results[i].item_id);
            // console.log(results[i].product_name);
            // console.log(results[i].price);
            table.push(
                [results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity]
            );
        }
        console.log(table.toString());

        connection.end();
    });
};

//checks for low inventory (5 or less)
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity<=5",
        function (err, results) {
            if (err) throw err;
            for (var i = 0; i < results.length; i++) {
                table.push(
                    [results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity]
                );
            }
            console.log(table.toString());
            connection.end();
            optionsMenu();
        });
}

//add inventory will add to the stock_quantity
function addInventory() {
    inquirer.prompt([{
                name: "input_product",
                type: "input",
                message: "Enter the item number to which you would like to add stock:",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
            {
                //The user is asked the amount
                name: "item_amount",
                type: "input", 
                message: "How many would you like to add to stock?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }

        ]).then(function (answer) {

                connection.query ("SELECT stock_quantity FROM products WHERE item_id = ?", 
                [answer.input_product],

                 function(error, results){
                     if(error) throw err;

                     for(stock_quantity in results) {
                        if(results.hasOwnProperty(stock_quantity)) {
                            var value = results[stock_quantity];
                            //do something with value;
                            console.log(value);
                            var currentStock = Object.values(value);
                            console.log(currentStock);
                            var currentStock2 = parseInt(currentStock.toString());
                            console.log(currentStock2);
                           
                            var newStock = currentStock2 + parseInt(answer.item_amount);
                            console.log(newStock);
                        }
                    }

                    
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                    [newStock, answer.input_product],
                    
                    function (err) {
                        if (err) throw err;
                        console.log(newStock);
                        console.log (answer.input_product + " has been updated and now has " + newStock );
                        connection.end();
                        
                    });
                });

                })
            }


            var optionsMenu = function () {

                inquirer.prompt([{

                    name: "options",
                    type: "list",
                    choices: ["Products for Sale", "Low Inventory", "Add to Inventory", "Add New Product"],
                    message: "What would you like to do?"

                }]).then(function (answer) {
                    switch (answer.options) {
                        case "Products for Sale":
                            productsSale();
                            break;
                        case "Low Inventory":
                            lowInventory();
                            break;
                        case "Add to Inventory":
                            addInventory();
                            break;

                        case "Add new Product":
                            addProduct();
                            break;

                    }

                })
            }


            connection.connect(function (err) {
                if (err) throw err;
                console.log("connected as id " + connection.threadId);
                optionsMenu();
            });

            //         ### Challenge #2: Manager View (Next Level)



            // * Create a new Node application called `bamazonManager.js`. Running this application will:



            //   * List a set of menu options:



            //     * View Products for Sale



            //     * View Low Inventory



            //     * Add to Inventory



            //     * Add New Product



            //   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.



            //   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.



            //   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.



            //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.