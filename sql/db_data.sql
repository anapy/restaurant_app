--This document contains all the data necessary for the database

-- insert all info in menu_item_type --
INSERT INTO menu_item_type VALUES ('main'), ('drink'), ('dessert');

-- insert all info in menu items table --
INSERT INTO menu_items VALUES (1, 'Avo on toast', 8.50, 'main');
INSERT INTO menu_items VALUES (2, 'Pesto pasta with pine nuts and mozzarella', 9.50, 'main');
INSERT INTO menu_items VALUES (3, 'Roasted pork belly with kimchi and soy sauce glaze', 11.00, 'main');
INSERT INTO menu_items VALUES (4, 'Mac and cheese with crunchy seitan bacon (V)', 10.00, 'main');
INSERT INTO menu_items VALUES (5, 'Gin and Tonic', 9.05, 'drink');
INSERT INTO menu_items VALUES (6, 'White Russian', 9.20, 'drink');
INSERT INTO menu_items VALUES (7, 'Mojito', 8.00, 'drink');
INSERT INTO menu_items VALUES (8, 'Old Fashioned', 9.00, 'drink');
INSERT INTO menu_items VALUES (9, 'Brownie', 7.20, 'dessert');
INSERT INTO menu_items VALUES (10, 'Cheesecake', 7.50, 'dessert');
INSERT INTO menu_items VALUES (11, 'Carrot Cake', 6.80, 'dessert');

-- insert all info in deals table --
INSERT INTO deals VALUES
(1, 'Hot offer! Get 10% off each main and drink combo', 'discount', 0.1),
(2, 'Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00', 'fixed', 40.00);

-- insert items info in deals items table --
INSERT INTO deals_items VALUES
(1, 'main', 1), (1, 'drink', 1), (2, 'main', 2), (2, 'drink', 2), (2, 'dessert', 1);