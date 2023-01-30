DROP DATABASE IF EXISTS store;
CREATE DATABASE store;
USE store;
CREATE TABLE user(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    , name  VARCHAR(255) NOT NULL
    , lastname VARCHAR(255) NOT NULL
    , sex ENUM("hombre", "mujer")
    , user_name VARCHAR(255) NOT NULL UNIQUE
    , password VARCHAR(255) NOT NULL
    , country VARCHAR(255) NOT NULL
    , city VARCHAR(255) NOT NULL
    , address VARCHAR(255) NOT NULL
    , photo VARCHAR(255) NOT NULL
);

CREATE TABLE store(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    , name  VARCHAR(255) NOT NULL UNIQUE
    , type VARCHAR(255) NOT NULL
    , date DATETIME NOT NULL
    , id_user INT UNSIGNED NOT NULL
    , FOREIGN KEY (id_user) REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
CREATE TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    , name  VARCHAR(255) NOT NULL
    , description VARCHAR(255) NOT NULL
    , price DECIMAL(8, 2) NOT NULL
    , date DATETIME NOT NULL
    , stock INT NOT NULL
    , image VARCHAR(255) NOT NULL
    , id_store INT UNSIGNED NOT NULL
    , FOREIGN KEY (id_store) REFERENCES store(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE order_buy(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    , quantity INT NOT NULL
    , unit_price DECIMAL(8, 2) NOT NULL
    , status ENUM("comprado", "sin-comprar") NOT NULL
    , id_user INT UNSIGNED NOT NULL
    , FOREIGN KEY (id_user) REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
    , id_product INT UNSIGNED NOT NULL
    , FOREIGN KEY (id_product) REFERENCES product(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
CREATE TABLE invoice(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    , date DATETIME NOT NULL
    , status ENUM("pagado-sin_enviar", "pagado-enviado")
    , total_price DECIMAL(8, 2) NOT NULL
    , id_store INT UNSIGNED NOT NULL
    , FOREIGN KEY (id_store) REFERENCES store(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
    , id_order_buy INT UNSIGNED NULL
    , FOREIGN KEY (id_order_buy) REFERENCES order_buy(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- INSERT DATA

INSERT INTO user(name, lastname, sex, user_name, password, country, city, address, photo) VALUES
("juan", "guevara", "hombre", "juanito", "1234", "alemania", "Berlin", "nueva berlin 123", "user1.png"),
("maria", "olivera", "mujer", "mari", "1234", "peru", "cusco", "magisterio A5", "user2.png");

INSERT INTO store(name, type, date, id_user) VALUES
("cool store", "ropa de mujer", "2020-01-05 10:10:10", "1"),
("urban shop", "ropa de varon", "2020-02-03 10:10:10", "2");

INSERT INTO product(
    name, description, price, date, stock, image, id_store
) VALUES
("falda", "falda roja talla m", "49.50", "2020-01-05 10:10:10", "5", "faldaRoja.png", "1"),
("chompa", "chompa roja talla m", "87.20", "2020-01-05 10:10:10", "3", "chompaRoja.png", "1"),
("blusa", "blusa blanca talla m", "27.90", "2020-01-05 10:10:10", "8", "blusaBlanca.png", "1"),
("pantalon", "pantalon jean talla m", "47.50", "2020-01-05 10:10:10", "5", "pantalon.png", "2"),
("camisa", "camisa blaca talla m", "85.20", "2020-01-05 10:10:10", "3", "camisa.png", "2"),
("sueter", "sueter plomo talla m", "29.90", "2020-01-05 10:10:10", "8", "sueter.png", "2");
