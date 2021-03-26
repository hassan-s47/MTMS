const express = require('express');
const teacherController=require('../controllers/teacherController');
const loginController = require('../controllers/loginController');
const router = express.Router();


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
    res.render('album');
})

router.get('/album/detail',(req, res)=>{

    res.render('albumDetails');
})

router.get('/student',(req, res)=>{
    res.render('addStudent');
})
<<<<<<< HEAD
router.get('/viewStudent',(req, res)=>{
    res.render('studentManagement')
})
router.get('/routine',(req, res)=>{
    res.render('routine')
})
=======

router.get('/createConcert',(req, res) =>{
    res.render('createConcert')
})

>>>>>>> 5e6353062b194c7621f212bc52d6b2b40d0364b9
module.exports = router;