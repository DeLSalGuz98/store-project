/*
----------UUSUARIO---------------------------
* crear usaurio
* obtener los datos del usuario solo con su username
* mostrar los datos del usuario especifico
* editar los datos de usuario (nombre, apellido, sexo, username, contraseña, pais, cuidad, direccion, foto)
--------CLIENTE----------
* obtener todos los productos de las tiendas(nombre, imagen, precio, tienda)
* obtener informacion de un solo producto (foto, nombre, descripcion, tienda, precio, stock)
--------VENDEDOR----------
* crear tienda
* crear producto (nombre, precio, descripcion, imagen)
* mostrar los productos creados(nombre, precio, foto)
* editar productos (nombre, precio, descripcion, imagen)
------------------------------
* mostrar las tiendas que pertenecen a un usuario especifico(nombre, fecha)
------------------------------------
* mostrar las compras pendientes de envio de una teinda en especifico(foto, cliente, pais, ciudad, direccion, fecha, producto, cantidad)
* mostrar todos los productos vendidos, es decir, que ya haigan sido enviados(nombre fecha monto total).
* obtener la suma de todos los precios del ultimo mes
*/
--USER
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
--get user with username
select *
from user where username = "juanito23";
-- get user data with id--
select * from user where id= "2";
--edit user's data--
update user
set username = "juanito23"
where id = "1";

--CLIENT
--show all products
select product.id as id_product
    , product.name as product
    , product.image
    , product.price
    , product.stock
    , store.name as store
    , store.id as id_store
from product 
join store on store.id = product.id_store
where stock >= 1;
-- get product data with id
select product.id as id_product
    , product.name as product
    , product.image
    , product.description
    , product.price
    , product.stock
    , store.name as store
    , store.id as id_store
from product 
join store on store.id = product.id_store
where product.id = "5";
-- make order
INSERT INTO order_buy(quantity, unit_price, status, id_user, id_product) VALUES
("2","85.20", "sin-comprar","1","5");

--show all products of a user added to shipping buy 
select product.id as product_id
    , product.name as product
    , product.image
    , order_buy.quantity
    , order_buy.unit_price
    , (order_buy.quantity * order_buy.unit_price) as total_price
    , order_buy.status
    , order_buy.id as order_id
    , product.id_store
from order_buy
join product on product.id = order_buy.id_product
where id_user = "2" and order_buy.status = "sin-comprar";

-- generate invoice, and reduce the product stock
START TRANSACTION;
--reducir stock
UPDATE product
SET stock = (stock-2)
WHERE id = "5";
--crear factura
INSERT INTO invoice(date, status, total_price, id_store, id_order_buy) VALUES
("2020-02-05 10:10:10", "pagado-sin_enviar", "170.40", "2", "1");
update order_buy
set status = "comprado"
where id = "1";
COMMIT;

--SELER
--show all user's stores
select id as id_store,name, date, id_user 
from store
where id_user = "2";
--show all store's products
select id as id_product
    , name as product
    , price
    , image
    , stock
from product
where id_store = "2";
--show products from specifict store where status is "pagado sin enviar" 
select product.id as id_product
    , product.image
    , product.name as product
    , user.name as client
    , user.country
    , user.city
    , user.address
    , invoice.date
    , order_buy.quantity
    , invoice.id as invocie_id
from invoice
join order_buy on order_buy.id = invoice.id_order_buy
join product on product.id = order_buy.id_product
join user on user.id = order_buy.id_user
where invoice.status = "pagado-sin_enviar" 
and invoice.id_store = "2";

-- set status product as "pagado-enviado"
update invoice
set status = "pagado-enviado"
where id="1";

-- show all sold products from a specific store
select product.name as product
    , invoice.date 
    , invoice.total_price
from invoice
join order_buy on order_buy.id = invoice.id_order_buy
join product on product.id = order_buy.id_product
where invoice.id_store = "2"
and invoice.status = "pagado-enviado";

--get total amount by month
select sum(invoice.total_price) as total_amount
        , EXTRACT(YEAR from invoice.date) as year
        , EXTRACT(MOTH from invoice.date) as month
from invoice
where invoice.status = "pagado-enviado"
and invoice.id_store = "2";
--edit product's data--
update product
set price = "54.70"
where id="2";