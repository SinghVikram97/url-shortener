// Get requirements
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const path=require('path');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());

app.get('/new/:urlToShorten(*)',(req,res)=>{

   let {urlToShorten}=req.params;

   return res.json(urlToShorten);

});





app.use('/',express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT  || 4444,()=>{

    console.log("Server started at http://localhost:4444");

});