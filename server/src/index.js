const express = require('express');
const app = express();
const port = 3000;
require('./conection/conextion.js')


app.listen(port, ()=>{
    console.log(`server ready on port: ${port}`);
});