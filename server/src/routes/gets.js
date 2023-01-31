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
router.get('/signin/:username', async function(req, res) {
    const {username} = req.params;
    const [row] = await db.query('SELECT * FROM user WHERE user_name =?',[username])
    res.status(200).json(row[0])
    //const [row] = await db.query('select * from user;');
    
});

module.exports = router;