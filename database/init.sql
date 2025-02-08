DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS menus;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO categories (name) VALUES ('Main Course');
INSERT INTO categories (name) VALUES ('Beverage');
INSERT INTO categories (name) VALUES ('Dessert');

CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO menus (name, description, price, category_id) VALUES ('Beef Steak', 'A delicious steak with a side of mashed potatoes', 25.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Grilled Salmon', 'A fresh salmon with a side of steamed vegetables', 22.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Chicken Alfredo', 'A creamy chicken Alfredo with a side of garlic bread', 18.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Iced Tea', 'A refreshing iced tea', 3.99, 2);
INSERT INTO menus (name, description, price, category_id) VALUES ('Fresh Orange Juice', 'A fresh orange juice', 4.99, 2);
INSERT INTO menus (name, description, price, category_id) VALUES ('Chocolate Cake with Ice Cream', 'A chocolate cake with a side of ice cream', 6.99, 3);
INSERT INTO menus (name, description, price, category_id) VALUES ('Ice Cream Sundae', 'A delicious ice cream sundae', 5.99, 3);
INSERT INTO menus (name, description, price, category_id) VALUES ('Pad Thai', 'Stir-fried rice noodles with shrimp, tofu, peanuts and tamarind sauce', 14.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Sushi Roll Platter', 'Assorted fresh sushi rolls with wasabi and pickled ginger', 24.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Korean BBQ Beef', 'Marinated grilled beef with kimchi and steamed rice', 19.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Chicken Tikka Masala', 'Tender chicken in creamy curry sauce with naan bread', 16.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Vietnamese Pho', 'Rice noodle soup with beef, herbs and bean sprouts', 13.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Dim Sum Platter', 'Assorted steamed dumplings with dipping sauces', 18.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Thai Green Curry', 'Spicy coconut curry with vegetables and chicken', 15.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Peking Duck', 'Crispy duck with pancakes, scallions and hoisin sauce', 29.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Bibimbap', 'Korean rice bowl with vegetables, beef and fried egg', 16.99, 1);
INSERT INTO menus (name, description, price, category_id) VALUES ('Singapore Noodles', 'Stir-fried vermicelli with curry powder, shrimp and char siu', 14.99, 1);

