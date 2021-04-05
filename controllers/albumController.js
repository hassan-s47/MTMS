const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
const Album = require('../models/album');
const songs = require('../models/songs');
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

    console.log(req.body.student)


}

const addSongView= async (req,res)=> {
    Student.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // console.log(items);
            res.render('addSongs', { items: items}); 
        } 
    });
}
const createAlbum=async (req, res) => {
    
   const album = new Album({
    albumName: req.body.albumName,
    img: { 
        data: fs.readFileSync(path.join('./public/uploads/' + req.file.filename)), 
        contentType: 'image/png'
    } 

   })
   album.save()
   .then((response)=>{
       console.log(req.file.filename)
  
    Album.find({}, (err, items) => { 
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
    Album.find({}, (err, items) => { 
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


const getAlbum=async (req, res) => {
    Album.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // console.log(items);
            res.render('album', { items: items,success:"",failure:"" }); 
        } 
    }); 
} 

module.exports ={
    createAlbum,
    upload,
    getAlbum,
    addSong,
    addSongView
}