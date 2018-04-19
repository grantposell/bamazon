DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE IF NOT EXISTS items(
  item_id INTEGER(10) AUTO_INCREMENT,
  product_name VARCHAR(200) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INTEGER (10),
  product_sales DECIMAL(10,2),
  PRIMARY KEY (item_id)
);
CREATE TABLE IF NOT EXISTS departments (
	department_id INTEGER(10) auto_increment,
	department_name varchar(32),
	over_head_costs decimal(10,2),
    primary key (department_id)
);

INSERT INTO items (
 product_name
, department_name
, price
, stock_quantity
)values
( 'KitchenAid Mixer', 'Kitchen' , 250.99, 55 ),
( 'Yeti 900ML Bottle', 'Outdoor Lifestyle' , 50.99, 100),
( 'Apple Macbook', 'Electronics' , 1500.99, 25),
( 'Apple iPhone', 'Electronics' , 1000.99, 50),
( 'West Elm Coffee Table', 'Furniture' , 300.99, 5),
( 'Anthropologie Throw' , 'Decor' , 200.99, 10),
( 'Record Player' , 'Electronics' , 150.99, 20),
( 'Lionel Messi Jersey' , 'Apparel' , 45.99, 23),
( 'James Hardin Playoff Jersey' , 'Apparel' , 4000.99, 1),
( 'Lamborghini Gallardo Yellow' , 'Automotive' , 500000.99,3);


INSERT INTO departments (
	department_name,
	over_head_costs
)VALUES
('Kitchen', 300),
('Outdoor Lifestyle', 100),
('Electronics', 200),
('Furniture', 100),
('Apparel', 100),
('Decor', 200),
('Automotive', 200);
