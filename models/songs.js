const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    year :{ type: String, required:true},
    pieceName :{ type: String, required:true},
    composerName:{ type:String, required:true},
    student:[{ 
        email:{ type: String, required:true,}
    }]

   
},{timestamps : true  });

const Song = mongoose.model('song', SongSchema);

module.exports = Song;
