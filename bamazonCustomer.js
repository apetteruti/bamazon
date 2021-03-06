var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require ("cli-table");

var table = new Table({
  head: ["Item Id", "Product Name", "Price"],
      
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


// 5. Running this application will first display all of the items available for sale. 
// Include the ids, names, and prices of products for sale.

function afterConnection() {

  console.log ("-----WELCOME TO BAMAZON!-----")
  
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
         // console.log(results[i].item_id);
      // console.log(results[i].product_name);
      // console.log(results[i].price);
      table.push(
        [results [i].item_id, results[i].product_name, results[i].price]
      );
    }
    console.log(table.toString());
    buyProduct();
  });
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});


function buyProduct() {
  
  inquirer.prompt([{

      name: "id_item",
      type: "input",
      message: "Referring to the list above, what is the ID number of the ITEM you would like to purchase?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
    },
    {
      //The user is asked the amount
      name: "amount",
      type: "input", //remember to go back and put in an err statement to make sure this is a number
      message: "How many would you like to purchase?",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
    

  ]).then(function (answer) {
      console.log("You chose item number: " + answer.id_item + " and you would like " + answer.amount + " of them");

      connection.query(`SELECT * FROM products`, function (err, results) {

          if (err) throw err;
          //Check to see if the item number is in the database

          for (var i = 0; i < results.length; i++) {
            // console.log(results[i].item_id);
            // console.log(results[i].stock_quantity);
            // console.log (answer.id_item);

            if (results[i].item_id === parseInt(answer.id_item)) {
              var chosenItem = results[i].item_id;
              // console.log (chosenItem);
              var chosenStock = results[i].stock_quantity;
              // console.log(chosenStock);
              var chosenPrice = results[i].price;
              // console.log(chosenPrice);

              if (chosenStock >= parseInt(answer.amount)){
                // console.log (chosenStock- answer.amount);
                var newQuantity = chosenStock- answer.amount;

                connection.query(
                  "UPDATE products SET stock_quantity = ? WHERE item_id = ?", 
                  
                  [newQuantity, answer.id_item],
            
                function (err) {
                  if (err) throw err;
                  console.log("Purchase completed! There are now " + newQuantity + " remaining")
                }
                )

                //Calculate purchase price based on the item ID that was selected
                connection.query("SELECT price FROM products WHERE ?", [
                  answer.id_item
                ],
                  function (err) {
                    if (err) throw err;
                    var cost = chosenPrice * answer.amount;
                    console.log("Your total cost is $" + cost);
                    connection.end();
                  }
                  //create variable to hold the price amount and then report it
                ); 
              }

              else{
                console.log("Unfortunately, due to limited supply, your order cannot be completed at this time.")
                connection.end();
              }
            }

            // else{
            //   console.log ("The item number you entered was not found. Please try again.")};

             
                // connection.end();
              
          };
          // }

        }
      )
  });

}


