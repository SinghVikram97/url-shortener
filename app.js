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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shortUrl').then(function () {

    console.log('Database connected');

});

app.get('/new/:urlToShorten(*)',(req,res)=>{

   // To check a valid url
   let regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

   let {urlToShorten}=req.params;

   if(regex.test(urlToShorten)===true){

       // Logic to create short url

       let short=Math.floor(Math.random()*100000).toString();
       let data=new shortUrl({

          originalUrl:urlToShorten,
          shorterUrl:short

       });

       data.save((err)=>{

           if(err){
               res.send('Error saving to the database');
           }

       });

       res.json(data);
   }

   else{
       let data=new shortUrl({

          originalUrl:urlToShorten,
          shorterUrl:'Invalid Url'

       });
       res.json(data);
   }

});


// Query database and redirect to original url
app.get('/:urlToForward',(req,res)=>{

    let shorterUrl=req.params.urlToForward;

    console.log(shorterUrl);

    // Find one

    shortUrl.findOne({'shorterUrl':shorterUrl},(err,data)=>{

        console.log(data);

        if(err){
            res.send('Error reading database');
        }

        // res.redirect
        // By default it assumes if it doesn't have http or https it thinks it as a local resource
        else{

            let regexStr = new RegExp("^(http|https)://", "i");
            let strToCheck=data.originalUrl;
            if(regexStr.test(strToCheck)===true){

                // 301 redirect code for permanently moved site
                res.redirect(301,data.originalUrl);

            }
            else{

                res.redirect(301,'http://'+data.originalUrl);
            }

        }

    })


});




app.use('/',express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT  || 4444,()=>{

    console.log("Server started at http://localhost:4444");

});