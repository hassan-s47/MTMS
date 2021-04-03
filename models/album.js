const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    albumName :{ type: String, required:true},
    img: 
    { 
        data: Buffer, 
        contentType: String 
    },
    songs: [
       {
           pieceName:{ type: String, required:true}
       }
    ]
, 

   
},{timestamps : true  });

const Album = mongoose.model('album', AlbumSchema);

module.exports = Album;