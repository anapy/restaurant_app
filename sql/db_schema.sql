use adfoodio;

-- table with the three different types of items
CREATE TABLE menu_item_type (
	id varchar(10) PRIMARY KEY
);

-- create table that contains food, drinks and desserts
CREATE TABLE menu_items (
	id int PRIMARY KEY AUTO_INCREMENT,
	description varchar(200) NOT NULL,
	price float NOT NULL,
	type varchar(10) NOT NULL,
	CONSTRAINT FK_type FOREIGN KEY (type) REFERENCES menu_item_type(id)
);

-- table with the info of the available deals
CREATE TABLE deals (
	id int PRIMARY KEY AUTO_INCREMENT,
	description varchar(200) NOT NULL,
	type varchar(10) NOT NULL,
	deal float NOT NULL
);

-- table that links deals with items that activate them
CREATE TABLE deals_items (
	deal_id int NOT NULL,
	menu_item_type varchar(10) NOT NULL,
	quantity int NOT NULL,
	CONSTRAINT FK_deal_id_deals_items FOREIGN KEY (deal_id) REFERENCES deals(id),
	CONSTRAINT FK_menu_item_type_deals_items FOREIGN KEY (menu_item_type) REFERENCES menu_item_type(id)
);

-- table that will record users
CREATE TABLE users (
	id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  email varchar(45) NOT NULL,
  password varchar(250) NOT NULL,
);

-- records orders information and links orders with their users and final price
CREATE TABLE orders (
	id int PRIMARY KEY AUTO_INCREMENT,
  user_id int NOT NULL,
	CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  price float NOT NULL
);

-- links orders with deals involved
CREATE TABLE order_deal (
	order_id int NOT NULL,
	deal_id int NOT NULL,
	quantity int NOT NULL,
	CONSTRAINT FK_order_id FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT FK_deal_id FOREIGN KEY (deal_id) REFERENCES deals(id)
);

-- links all user with their orders
CREATE TABLE users_orders (
	user_id int NOT NULL,
	order_id int NOT NULL,
	CONSTRAINT FK_user_id_users_orders FOREIGN KEY (user_id) REFERENCES users(id),
	CONSTRAINT FK_order_id_users_orders FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- links orders with the items contained
CREATE TABLE order_menu_items (
	order_id int NOT NULL,
	menu_item_id int NOT NULL,
	quantity int NOT NULL,
	CONSTRAINT FK_order_id_order_menu_items FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT FK_menu_item_id_order_menu_items FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

