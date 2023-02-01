const express = require('express');
const router = express.Router();

const conection = require('../conection/conection.js')
let db;

//MIDDLEWARE
router.use(async function(req, res, next) {
    console.log('route: ',req.originalUrl);
    console.log('method: ',req.method);
    db = await conection();
    next();
});

//USER
//edit data user
/*
{
    "name":"lucas",
    "lastname":"guerra",
    "sex": "hombre",
    "user_name": "luc23",
    "password": "123",
    "country":"peru",
    "city": "lima",
    "address": "miraflores123",
    "photo": "luc.png"
}
*/
router.put('/edit-user/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const {name, lastname, sex, user_name, password, country, city, address, photo} = req.body;
        const [row] = await db.query(`
            UPDATE user
            SET name = ?, 
            lastname = ?, 
            sex = ?, 
            user_name = ?, 
            password = ?, 
            country = ?, 
            city = ?, 
            address = ?, 
            photo = ?
            WHERE id = ?;
        `, [name, lastname, sex, user_name, password, country, city, address, photo, id]);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(418)
    }
});
//SELER
//edit product
/*
{
    "name": "cortina",
    "description": "cortina blanca, bordado con flores,largo 2m",
    "price": "45.20",
    "date": "2020-01-05 10:10:10",
    "stock": "9",
    "image": "cortina.png"
}
*/
router.put('/edit-product/:id_product', async(req, res)=>{
    try {
        const {id_product} = req.params;
        const {name, description, price, date, stock, image} = req.body;
        const [row] = await db.query(`
            UPDATE product
            SET name = ?, 
            description = ?, 
            price = ?, 
            date = ?, 
            stock = ?, 
            image = ?
            WHERE id = ?;
        `, [name, description, price, date, stock, image, id_product]);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(418)
    }
});
//send product to client
router.put('/send-product/:id_invoice', async(req, res)=>{
    try {
        const {id_invoice} = req.params;
        const {date} = req.body;
        const [row] = await db.query(`
            UPDATE invoice
            SET status = "pagado-enviado",
            date = ?
            WHERE id=?;
        `, [date, id_invoice]);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(418)
    }
});
module.exports = router;