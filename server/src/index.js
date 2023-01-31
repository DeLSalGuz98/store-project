const express = require('express');
const app = express();
const port = 3000;

const gets = require('./routes/gets.js');
const posts = require('./routes/posts.js');

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api-get', gets);
app.use('/api-post', posts);


app.listen(port, ()=>{
    console.log(`server ready on port: ${port}`);
});