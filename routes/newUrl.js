const route=require('express').Router();
let MODEL_PATH = '../models/';
const {shortUrl} = require(MODEL_PATH + 'shortUrl');

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
                res.json(doc);

            }
            else{

                // Logic to create short url

                console.log(urlToShorten);

                let short=logicToShorten(urlToShorten);

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
        });
    }

    else{
        let data=new shortUrl({

            originalUrl:urlToShorten,
            shorterUrl:'Invalid Url'

        });
        res.json(data);
    }

});

function logicToShorten(urlToShorten) {


}

module.exports=route;