const route=require('express').Router();
let MODEL_PATH = '../models/';
const {shortUrl} = require(MODEL_PATH + 'shortUrl');
const shortNum=require('../shortNum');

route.post('/:urlToShorten(*)',(req,res)=>{

    // To check a valid url
    let regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    let {urlToShorten}=req.params;

    // Test if valid url
    if(regex.test(urlToShorten)===true){

        // Find if url already shortened
        shortUrl.findOne({'originalUrl':urlToShorten},function (err,doc) {

            if(doc){

                // Already shortened
                res.send({
                    hash:shortNum.encode(doc._id)
                })

            }
            else{

                // Logic to create short url

                let data=new shortUrl({

                    originalUrl:urlToShorten

                });

                data.save((err,data)=>{

                    if(err){
                        console.log(err);
                        res.send('Error saving to the database');
                    }
                    else{
                        res.send({
                            hash:shortNum.encode(data._id)
                        })
                    }

                });

            }
        });
    }

    else{
        //    Handle invalid url
    }

});


module.exports=route;