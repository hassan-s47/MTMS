const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
const Student = require('../models/student'); 
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
const addStudent=async(req, res)=>{
    console.log(req.file)
    var obj = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        address: req.body.address,
        signinDate: req.body.signinDate,
        instrumentModel: req.body.instrumentModel,
        semCount: req.body.semCount,
       
        img: { 
            data: fs.readFileSync(path.join('./public/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 
    Student.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            res.redirect('/student?abc=Successfully Created'); 
        } 
    }); 

}
const showStudent= async (req,res)=>{
    Student.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // console.log(items);
            res.render('studentManagement', { items: items }); 
        } 
    }); 
} 
module.exports ={
    addStudent,
    upload,
    showStudent,
}