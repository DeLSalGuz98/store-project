const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const conection = require('../conection/conection.js');
let db;

//MIDDLEWARE
router.use(async function(req, res, next) {
    console.log('route: ',req.originalUrl);
    console.log('method: ',req.method);
    db = await conection();
    next();
});
//SELER
/*
{
    "name": "tela magica",
    "type": "cubrecamas, sabanas y cortinas",
    "date": "2020-01-05 10:10:10",
    "id_user": "7"
}
*/
//create new store
router.post('/new-store', async(req, res)=>{
    if(!req.headers.authorization){
        return res.sendStatus(401)
    }
    try {
        const token = req.headers.authorization;
        const tokenData = jwt.verify(token, process.env.NODE_SECRET_WORD);
        const {name, type, date} = req.body;
        const [row] = await db.query(`
        INSERT INTO store(name, type, date, id_user) VALUES(?, ?, ?, ?);
        `,[name, type, date, tokenData.id]);
        res.status(201).json(row);
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
});
/*
{
    "name": "cortina",
    "description": "cortina blanca, bordado con flores,largo 2m",
    "price": "45.20",
    "date": "2020-01-05 10:10:10",
    "stock": "9",
    "image": "cortina.png"
    "id_store": "3"
}
*/
// create new product
router.post('/new-product', async(req, res)=>{
    if(!req.headers.authorization){
        return res.sendStatus(401)
    }
    try {
        const {name, description, price, date, stock, image, id_store} = req.body;
        const [row] = await db.query(`
        INSERT INTO product(
            name, description, price, date, stock, image, id_store
        ) VALUES(?, ?, ?, ?, ?, ?, ?);
        `,[name, description, price, date, stock, image, id_store]);
        res.status(201).json(row)
    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
    }
});

//CLIENT
/*
{
    "quantity":"2",
    "unit_price": "45.20",
    "id_user": "2",
    "id_product": "7"
}
*/
// add product to shipping cart
router.post('/add-shipping-cart', async(req, res)=>{
    if(!req.headers.authorization){
        return res.sendStatus(401)
    }
    try {
        const token = req.headers.authorization;
        const tokenData = jwt.verify(token, process.env.NODE_SECRET_WORD);
        
        // status(comprado, sin-comprado)
        const {quantity, unit_price, id_user, id_product} = req.body;
        const [row] = await db.query(`
        INSERT INTO order_buy(quantity, unit_price, status, id_user, id_product) VALUES
        (?,?, "sin-comprar",?,?);
        `,[quantity, unit_price, tokenData.id, id_product]);
        res.status(201).json(row);
    } catch (error) {
        console.log(eror)
    }
});
/*
{
    "quantity":"2",
    "id_product":"7",
    "date":"2020-02-05 10:10:10",
    "total_price":"90.40",
    "id_store": "3",
    "id_order_buy":"1"
}
*/
// buy product
router.post('/buy-product', async(req, res)=>{
    if(!req.headers.authorization){
        return res.sendStatus(401)
    }
    try {
        const {quantity, id_product, date, total_price, id_store, id_order_buy} = req.body;
        let [row] = await db.query(`START TRANSACTION;`);
        [row] = await db.query(`
            UPDATE product 
            SET stock = (stock-?) 
            WHERE id = ?;
        `,[parseInt(quantity),id_product]);
        [row] = await db.query(`
            INSERT INTO invoice(date, status, total_price, id_store, id_order_buy) VALUES
            (?, "pagado-sin_enviar", ?, ?, ?);
        `,[date, total_price, id_store, id_order_buy]);
        [row] = await db.query(`
            UPDATE order_buy
            SET status = "comprado"
            WHERE id = ?;
        `,[id_order_buy]);
        [row] = await db.query(`COMMIT;`);
        res.status(201).json(row);
    } catch (error) {
        console.log(error)
        return res.sendStatus(401)
    }
});

module.exports = router;