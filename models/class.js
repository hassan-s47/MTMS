const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    teacher:  {type: Schema.Types.ObjectId,ref:'user', required:true},
    className :{ type: String, required:true,unique:true },
},{timestamps : true  });

const musicClass = mongoose.model('musicClass', ClassSchema);

module.exports = musicClass;