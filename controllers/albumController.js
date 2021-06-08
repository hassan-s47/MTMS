const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
const Album = require('../models/album');
const Songs = require('../models/songs');
const Student=require('../models/student');

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, './public/uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
const upload = multer({ storage: storage }); 

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return true;
    }
    return false;
}

const addSong=async (req, res) => {
    const song = new Songs({ 
        album: req.body.albumid,
        year: req.body.year,
        composerName : req.body.composername,
        pieceName : req.body.songname,
        student: req.body.student,
        file:  path.join('/uploads/' + req.file.filename )
    })
    
    song.save()
    .then((result) => {
        res.redirect('/album/detail/'+req.body.albumid)
    })
    .catch( (err) => {
        console.log(err);
    })



}

const addSongView= async (req,res)=> {
    Student.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // console.log(items);
            res.render('addSongs', {id:req.params.id, items: items}); 
        } 
    });
}


const createAlbum=async (req, res) => {
    
   const album = new Album({
    
        albumName: req.body.albumName,
        img:  path.join('/uploads/' + req.file.filename ) ,
        teacher : req.session.user
        
    })

   album.save()
   .then((response)=>{
       console.log(req.file.filename)
  
    Album.find({teacher: req.session.user}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // console.log(items);
           
            res.render('album', { items: items,success:"Album Created",failure:"" }); 
        } 
    }); 
   })
   .catch((err)=>{
    Album.find({teacher: req.session.user}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // console.log(items);
            res.render('album', { items: items,success:"Album Created",failure:"Error! cannot Upload the album" }); 
        } 
    }); 
    
   })
}

const getAlbumDetails =async (req, res) => {
    Songs.find({album:req.params.id})
    .then((result) => {
        console.log(result);
        req.session.album = req.params.id;
        res.render('albumDetails', {id:req.params.id, album: result} )

    })
    .catch((err) => {
        console.log(err); 
    })
}

const getAlbum=async (req, res) => {
    Album.find({teacher: req.session.user}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            
            res.render('album', { items: items,success:"",failure:"" }); 
        } 
    }); 
} 


const deleteSong=async (req, res) => {

    Songs.findByIdAndDelete(req.params.id)
    .then((result) => { 
        res.redirect('/album/detail/'+req.session.album)
    })

}
const removeAlbum=async (req, res) => {
    Album.findByIdAndDelete(req.params.id)
    .then((result) => { 
        res.redirect('/album')
    })
}

module.exports ={
    createAlbum,
    upload,
    getAlbum,
    getAlbumDetails,
    addSong,
    addSongView,
    deleteSong,
    removeAlbum,
}