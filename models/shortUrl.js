const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const urlSchema=new Schema({

   originalUrl:{

       type:String,
       required:true

   },
   shorterUrl:String

},{timestamps:true});


module.exports=mongoose.model('shortUrl',urlSchema);