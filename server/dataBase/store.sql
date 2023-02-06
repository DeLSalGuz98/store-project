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
    , photo VARCHAR(255) NULL
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
