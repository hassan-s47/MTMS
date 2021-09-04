const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SlotSchema = new Schema({
  teacher: {type: Schema.Types.ObjectId,ref:'user'},
  student: {type: Schema.Types.ObjectId,ref:'student'},
  class:{type: Schema.Types.ObjectId,ref:'class', required:true},
  day:{ type:String, required:true},
  startTime:{type:String, required:true},
  endTime:{type:String, required:true},
  status:{type:String, required:true},
},{timestamps : true  });

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;