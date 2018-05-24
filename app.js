// Get requirements
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const path=require('path');
const app=express();

let MODEL_PATH = './models/';
const shortUrl = require(MODEL_PATH + 'shortUrl');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

mongoose.connect('mongodb://vikram:urlpass@ds233970.mlab.com:33970/shorturl' || 'mongodb://localhost:27017/shortUrl').then(function () {

    console.log('Database connected');

});



app.use('/new',require('./routes/newUrl'));

app.use('/',require('./routes/urlForward'));



app.use('/',express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT  || 4444,()=>{

    console.log("Server started at http://localhost:4444");

});