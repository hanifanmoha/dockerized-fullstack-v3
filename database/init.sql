DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO categories (name) VALUES ('Makanan');
INSERT INTO categories (name) VALUES ('Minuman');
INSERT INTO categories (name) VALUES ('Cemilan');

CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price FLOAT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO menus (name, description, price, category_id) VALUES 
('Nasi Goreng Spesial', 'Nasi goreng dengan campuran ayam, udang, dan telur mata sapi', 25000, 1),
('Mie Ayam Bakso', 'Mie ayam dengan tambahan bakso sapi yang kenyal', 20000, 1),
('Ayam Geprek Level 5', 'Ayam goreng crispy dengan sambal pedas level 5', 22000, 1),
('Soto Betawi', 'Soto daging khas Betawi dengan santan dan emping', 30000, 1),
('Rendang Padang', 'Daging sapi empuk dengan bumbu rendang khas Padang', 35000, 1),
('Es Teh Manis Jumbo', 'Teh manis dingin yang menyegarkan dengan porsi jumbo', 8000, 2),
('Jus Alpukat Kental', 'Jus alpukat segar dengan tambahan susu coklat', 18000, 2),
('Kopi Tubruk', 'Kopi hitam khas Indonesia dengan aroma kuat', 15000, 2),
('Matcha Latte', 'Minuman matcha dengan susu segar dan foam tebal', 20000, 2),
('Es Cendol Durian', 'Cendol segar dengan tambahan daging durian asli', 25000, 2),
('Martabak Manis Keju', 'Martabak manis dengan taburan keju melimpah', 30000, 3),
('Roti Bakar Coklat Keju', 'Roti bakar dengan lelehan coklat dan keju', 15000, 3),
('Pisang Goreng Madu', 'Pisang goreng crispy dengan rasa madu alami', 12000, 3),
('Kue Cubit Lumer', 'Kue cubit setengah matang dengan topping coklat', 18000, 3),
('Keripik Balado', 'Keripik pedas dengan bumbu balado khas Padang', 10000, 3),
('Sate Ayam Madura', 'Sate ayam dengan bumbu kacang kental khas Madura', 25000, 1),
('Bakso Beranak', 'Bakso besar dengan isi bakso kecil di dalamnya', 28000, 1),
('Es Kopi Susu Gula Aren', 'Kopi susu segar dengan manisnya gula aren asli', 18000, 2),
('Tahu Walik Crispy', 'Tahu goreng renyah dengan isian daging ayam', 15000, 3),
('Singkong Thailand', 'Singkong lembut dengan saus santan manis', 13000, 3);


