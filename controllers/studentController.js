const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 
const Student = require('../models/student'); 
const musicClass = require('../models/class')
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
const viewAvailability=async (req, res) => {
    res.render('viewAvailability')

}
const addStudent=async(req, res)=>{
    console.log(req.file)

    console.log(req.session.user)
    var obj = {
        class:req.body.className,
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        address: req.body.address,
        signinDate: req.body.signinDate,
        instrumentModel: req.body.instrumentModel,
        semCount: req.body.semCount,
        teacher: req.session.user,
        img: path.join('/uploads/' + req.file.filename)
         
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
    musicClass.find({teacher:req.session.user})
    .then((response) => {
        Student.find({teacher:req.session.user}, (err, items) => { 
            if (err) { 
                console.log(err); 
            } 
            else { 

                res.render('studentManagement', { items: items,classes:response}); 
            } 
        }); 
    })
   
} 
const filterStudents=async (req, res) => {
    musicClass.find({teacher:req.session.user})
    .then((response) => {
        console.log(req.body.className)
        Student.find({class:req.body.className}, (err, items) => { 
            if (err) { 
                console.log(err); 
            } 
            else { 

                res.render('studentManagement', { items: items,classes:response}); 
            } 
        }); 
    })

}
const loadAddStudent=async(req, res)=>{
    musicClass.find({teacher:req.session.user})
    .then((response)=>{
        res.render('addStudent',{classes:response});
    })
}

module.exports ={
    addStudent,
    upload,
    showStudent,
    loadAddStudent,
    filterStudents,
    viewAvailability,
}