const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
const Album = require('../models/album');
const songs = require('../models/songs');
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

const createAlbum=async (req, res) => {
   console.log("album",req.body.albumName)
   const album = new Album({
    albumName: req.body.albumName,
    img: { 
        data: fs.readFileSync(path.join('./public/uploads/' + req.file.filename)), 
        contentType: 'image/png'
    } 
   })
   album.save()
   .then((response)=>{
      res.render('album',{success:"Album Created",failure:""})
   })
   .catch((err)=>{
       console.log(err)
       res.render('album',{success:"",failure:"Error! cannot Upload the album"})
   })
const getAlbum=async (req, res) => {
    Album.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // console.log(items);
            res.render('user-news', { items: items }); 
        } 
    }); 
} 
}
module.exports ={
    createAlbum,
    upload,
}