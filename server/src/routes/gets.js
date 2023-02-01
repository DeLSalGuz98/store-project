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
// USER
//get user by user_name
router.get('/signin/:username', async function(req, res) {
    const {username} = req.params;
    const [row] = await db.query('SELECT * FROM user WHERE user_name =?',[username])
    res.status(200).json(row[0])    
});
//CLIENT
//show all products
router.get('/all-products', async function(req, res) {
    const [row] = await db.query(`
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
    `)
    res.status(200).json(row)    
});
//get product's data with id
router.get('/detail-product/:id', async function(req, res) {
    const {id} = req.params;
    const [row] = await db.query(`
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
    where product.id = ?;
    `,[id])
    res.status(200).json(row[0])    
});
//show shipping cart of one specific user
router.get('/shipping-cart/:id', async function(req, res) {
    const {id} = req.params;
    const [row] = await db.query(`
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
    `,[id])
    res.status(200).json(row)    
});
//SELER
//show all user's stores
router.get('/all-stores/:id', async(req, res)=>{
    const {id} = req.params;
    const [row] = await db.query(`
    select id as id_store,name, date, id_user 
    from store
    where id_user = ?;
    `,[id])
    res.status(200).json(row) 
});
// show all store's products
router.get('/all-products/:id', async(req, res)=>{
    const {id} = req.params;
    const [row] = await db.query(`
    select id as id_product
        , name as product
        , price
        , image
        , stock
    from product
    where id_store = ?;
    `,[id])
    res.status(200).json(row) 
});
//show shipping pending
router.get('/shipping-pending/:id', async(req, res)=>{
    const {id} = req.params;
    const [row] = await db.query(`
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
    and invoice.id_store = ?;
    `,[id])
    res.status(200).json(row) 
});
//show all sold products
router.get('/sold-products/:id', async(req, res)=>{
    const {id} = req.params;
    const [row] = await db.query(`
        select product.name as product
            , invoice.date 
            , invoice.total_price
        from invoice
        join order_buy on order_buy.id = invoice.id_order_buy
        join product on product.id = order_buy.id_product
        where invoice.id_store = ?
        and invoice.status = "pagado-enviado";
    `,[id])
    res.status(200).json(row) 
});
//get total money //*falta implementar
router.get('/total/:id_store', async(req, res)=>{
    const {id_store} = req.params;
    const {month, year} = req.body;
    const [row] = await db.query(`
    SELECT SUM(invoice.total_price) as total_amount
        , EXTRACT(YEAR from invoice.date) as year
        , EXTRACT(MONTH from invoice.date) as month
    FROM invoice
    WHERE invoice.status = "pagado-enviado"
    AND invoice.id_store = ?
    AND EXTRACT(MONTH from invoice.date) = ?
    AND EXTRACT(YEAR from invoice.date) = ?;
    `,[id_store, month, year]);
    res.status(200).json(row) 
});
module.exports = router;