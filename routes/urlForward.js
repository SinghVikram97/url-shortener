const route=require('express').Router();
let MODEL_PATH = '../models/';
const shortUrl = require(MODEL_PATH + 'shortUrl');

// Query database and redirect to original url
route.get('/:urlToForward',(req,res)=>{

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

module.exports=route;