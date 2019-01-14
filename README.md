# bamazon

##Introduction
Looking for a one-stop-shop for lipstick and an Optimus Prime Transformer? Search no further! Bamazon is your store. This application allows the user to search for an item using a provided ID number, enter a quanitity, determine if there are enough stock, and, if so, report the price. 

##Using the Application

Begin by entering node bamazonCustomer.js in the command line, which will return a list of items that includes:

- item_id: A unique item number for the product, which will increment automatically if new products are added. The item ID also serves as the primary key for the database. 
- product_name: The name of the product. 
- price: The cost of an individual item, entered to include decimals. 
- stock_quantity: The number of items in stock available for purchase.

Follow the prompts to enter the item id (this has to be a number) and the quanitity desired.

The application will respond with a message confirming the item number and the quantity. It will then check to see if there are enough items to fill the order and respond with the total cost.

If there are not enough items in stock, the application will respond with the appropriate message and end the order.

*Demonstration Link:* 