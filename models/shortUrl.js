const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const countersSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', countersSchema);

const urlSchema=new Schema({

   originalUrl:{

       type:String,
       required:true

   },
   shorterUrl:String

},{timestamps:true});

/// Before saving to shortUrl collection do this (Adds a middleware)
urlSchema.pre('save', function(next) {
    let doc = this;
    // Only one document in counter collection which has id:url_count
    Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { count: 1 } }, function(err, counter) {
        if(err) return next(err);
        console.log(counter);
        console.log(counter.count);
        doc._id = counter.count;
        doc.created_at = new Date();
        console.log(doc);
        next();
    });
});

module.exports.shortUrl=mongoose.model('shortUrl',urlSchema);
module.exports.Counter=Counter;