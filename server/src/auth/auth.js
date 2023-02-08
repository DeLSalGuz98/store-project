const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const conection = require('../conection/conection.js');
let db;
const genToken = require('./genToken.js');

//MIDDLEWARE
router.use(async function(req, res, next) {
    console.log('route: ',req.originalUrl);
    console.log('method: ',req.method);
    db = await conection();
    next();
});

//user authentication
//usuario dlsg pass 123
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY3NTM1OTc4MiwiZXhwIjoxNjc1NDQ2MTgyfQ.e0LTaKeM4RJvzcJlUSEBqTE495OoONPqRxjFO93jLMw
router.post('/login-user', async(req, res)=>{
    try {
        const {user_name, password} = req.body;
        let [row] = await db.query(`
            SELECT password FROM user WHERE user_name = ?;
        `, [user_name]);
        const isCorrectPass = bcrypt.compareSync(password, row[0].password);
        if(row.length > 0 && isCorrectPass == true){
            const [row] = await db.query(`
            SELECT id FROM user WHERE user_name = ?;
            `, [user_name]);
            const token = genToken(row[0].id)
            res.status(200).json({auth: true, token: token});
        }
        else{
            res.status(403).json({message: "incorrect creadentials"});
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
});

//register new user
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
//create new user
router.post('/new-user', async(req, res)=>{
    try {
        const {name, lastname, sex, user_name, password, country, city, address, photo} = req.body;
        const hash = bcrypt.hashSync(password, 5);
        const [row] = await db.query(`
            INSERT INTO user(name, lastname, sex, user_name, password, country, city, address, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
            [name, lastname, sex, user_name, hash, country, city, address, photo]);
        const token = genToken(row.insertId)
        res.status(200).json({auth: true, token: token});
    } catch (error) {
        res.sendStatus(400)
    }
});

module.exports = router;