const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const {v4: uuidv4} = require("uuid"); //v4 mean version 4 of uuid 

const router = require('./router');

const app = express();

const port = 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine','ejs');

//load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(), //hash value instad of string value  this method will this session completely secret and unique
    resave: false,
    saveUninitialized: true
}));
 
// this middleware will add all router from router.js
app.use('/route', router);


// home
app.get('/', (req,res) => {
    res.render('base', { title : "login system"});
})

app.listen(port, ()=>{
    console.log("listen ..")
});

