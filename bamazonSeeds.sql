-- CREATE DATABASE bamazon

-- USE bamazon;

-- CREATE TABLE products (
-- item_id INTEGER (10) AUTO_INCREMENT NOT NULL,
-- product_name VARCHAR (100) NOT NULL,
-- department_name VARCHAR (100) NOT NULL,
-- price NUMERIC (10,2) NOT NULL,
-- stock_quantity INTEGER (255),
-- PRIMARY KEY (item_id)
-- );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimus Prime Transformer", "Toys", 10, 10);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Snow Scraper", "Car Tools", 5, 99);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Blender", "Housewares", 79, 25);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Jeans", "Clothing", 55, 20);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Wizard of Oz DVD", "Movies", 9, 20);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Computer Monitor", "Technology", 199, 5);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Guitar", "Musical Instruments", 299, 3);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Drill", "Tools", 79, 5);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Bath Towel", "Linens", 39, 16);

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("Lipstick", "Makeup", 12, 17);

SELECT * FROM products