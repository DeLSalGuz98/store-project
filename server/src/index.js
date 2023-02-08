const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const port = 3000;
require('dotenv').config();

const gets = require('./routes/gets.js');
const posts = require('./routes/posts.js');
const puts = require('./routes/puts.js');
const auth = require('./auth/auth.js');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads')
}).single('image'))
app.use('/images', express.static(path.join(__dirname,'./public/uploads')));
//ROUTES
app.use('/api-get', gets);
app.use('/api-post', posts);
app.use('/api-put', puts);
app.use('/auth', auth);

app.listen(port, ()=>{
    console.log(`server ready on port: ${port}`);
});