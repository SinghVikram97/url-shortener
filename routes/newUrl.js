const route=require('express').Router();
let MODEL_PATH = '../models/';
const shortUrl = require(MODEL_PATH + 'shortUrl');

route.get('/new/:urlToShorten(*)',(req,res)=>{

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

module.exports=route;