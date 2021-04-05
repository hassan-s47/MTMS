const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    album: { type: Schema.Types.ObjectId, ref:'album', required:true},
    year :{ type: String, required:true},
    pieceName :{ type: String, required:true},
    composerName:{ type:String, required:true},
    student:[  {
        type: Schema.Types.ObjectId, ref: 'Student',
   }]

   
},{timestamps : true  });

const Song = mongoose.model('song', SongSchema);

module.exports = Song;
