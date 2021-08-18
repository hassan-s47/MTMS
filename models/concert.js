const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConcertSchema = new Schema({
   teacher: {type: Schema.Types.ObjectId,ref:'user', required:true},
   title: { type: String, required:true},
   location:{ type: String, required:true},
   dates:{ type:String, required:true},
   startTime:{type:String, required:true},
   endTime:{type:String, required:true},
   comments : { type:String, required:true},
   students : [
       {
            type: Schema.Types.ObjectId, ref: 'Student',
       }
   ]
   
},{timestamps : true  });

const Concert = mongoose.model('concert', ConcertSchema);

module.exports = Concert;