const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');

const gets = require('./routes/gets.js');
const posts = require('./routes/posts.js');
const puts = require('./routes/puts.js');
const auth = require('./auth/auth.js');

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'this is secret word',
    resave: true,
    saveUninitialized:true
}))

//ROUTES
app.use('/api-get', gets);
app.use('/api-post', posts);
app.use('/api-put', puts);
app.use('/auth', auth);

app.listen(port, ()=>{
    console.log(`server ready on port: ${port}`);
});