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

    });
    optionsMenu();
};

function lowInventory(){
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

    });
    optionsMenu();
}

//productsSale function that will list the products for sale



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

                        case "Add new Product":
                        addProduct();
  
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



