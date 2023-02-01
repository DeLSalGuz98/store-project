const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const conection = require('../conection/conection.js');
let db;

//MIDDLEWARE
router.use(async function(req, res, next) {
    console.log('route: ',req.originalUrl);
    console.log('method: ',req.method);
    db = await conection();
    next();
});

//user authentication
router.post('/login-user', async(req, res)=>{
    try {
        const {user_name, password} = req.body;
        let [row] = await db.query(`
            SELECT password FROM user WHERE user_name = ?;
        `, [user_name]);
        const isCorrectPass = bcrypt.compareSync(password, row[0].password);
        if(row.length > 0 && isCorrectPass == true){
            let data = await db.query(`
            SELECT id FROM user WHERE user_name = ?;
        `, [user_name]);
        res.status(200).json(data[0]);
        }
        else{
            res.status(403).json({message: "incorrect creadentials"});
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
});

module.exports = router;