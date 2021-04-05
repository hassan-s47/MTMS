const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    teacher: {type: Schema.Types.ObjectId,ref:'user', required:true},
    albumName :{ type: String, required:true},
    img:{type: String, required:true}, 

},{timestamps : true  });

const Album = mongoose.model('album', AlbumSchema);

module.exports = Album;