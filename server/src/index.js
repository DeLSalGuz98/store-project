const express = require('express');
const app = express();
const port = 3000;

app.get("/",(req, res)=>{
    res.send(`hellow from port ${port}`);
});
app.listen(port, ()=>{
    console.log(`server ready on port: ${port}`);
});