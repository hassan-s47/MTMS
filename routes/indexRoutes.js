const express = require('express');
const teacherController=require('../controllers/teacherController');
const loginController = require('../controllers/loginController');
const studentController = require('../controllers/studentController');
<<<<<<< HEAD
const albumController = require('../controllers/albumController');
=======
const concertController = require('../controllers/concertController');
>>>>>>> e12870c96b15dabc14bcafbba474d5d1da0f9f40
const router = express.Router();

router.post('/addStudent',studentController.upload.single('img'),studentController.addStudent)

router.get('/teacher',(req, res)=>{
    res.render('teacher')
})
router.get('/dashboard',(req, res)=>{
    res.render('dashboard')
})

router.get('/',(req, res)=>{
    res.render('login');
})

router.post('/login',loginController.login)

router.get('/register',(req, res)=>{
    res.render('register');
})

router.post('/register',loginController.register)


router.get('/calender',(req, res)=>{
    res.render('calender');
})

router.get('/album',(req, res)=>{
    res.render('album',{success:"",failure:""});
})

router.get('/album/detail',(req, res)=>{

    res.render('albumDetails');
})

router.get('/routine',(req, res) => {
    res.render('routine');
})

router.get('/student', studentController.showStudent)

router.get('/addStudent',(req, res)=>{
    res.render('addStudent')
})
router.post('/album',albumController.upload.single('img'),albumController.createAlbum)

router.get('/createConcert',(req, res) =>{
    res.render('createConcert')
})
router.get('/routine',(req, res) =>{
    res.render('routine')
})
module.exports = router;