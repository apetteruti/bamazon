var mysql = require("mysql");
var inquirer = require("inquirer");

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
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].item_id);
      console.log(results[i].product_name);
      console.log(results[i].price);
    }
    buyProduct();
  });
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});


//   6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.

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
      }
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
              var chosenStock = results[i].stock_quantity;
              
              // console.log (results[i].item_id + " & " + answer.id_item);
              // purchaseSuccess();
            };


            function purchaseSuccess() {
              connection.query("SELECT * FROM products", function (err, results) {
                if (err) throw err;
                for (var i = 0; i < results.length; i++){

                  console.log(results[i].stock_quantity);
                  
                  if (results[i].stock_quantity <= parseInt(answer.amount)) {
                    //if there are enough, create a new variable to reduce the stock amount
                    var newStockQuantity = results[i].stock_quantity - answer.amount;
                    
                    //update the database with the new quantity amount
                    connection.query(
                      "UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newStockQuantity
                      },
                      {
                        item_id: answer.id_item
                      }
                    ],
                    function (err) {
                      if (err) throw err;
                      console.log("Purchase completed! There are now " + newStockQuantity + " remaining")
                    }
                    );
                  }
                }
                }
                );

                //Calculate purchase price based on the item ID that was selected
                connection.query("SELECT price FROM products WHERE ?", [
                  {
                    item_id: answer.id_item
                  }
                ],
                  function (err) {
                    if (err) throw err;
                    console.log("err in finding the price of the item");
                    var cost = results[i].price * answer.amount;
                    console.log("Your total cost is " + cost);
                  }
                  //create variable to hold the price amount and then report it
                ); 
                
                // connection.end();
              
            };
          };
          // }

        }
      )
  })
}









// function buyAmount()
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.