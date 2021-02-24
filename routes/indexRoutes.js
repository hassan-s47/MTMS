const express = require('express');
const teacherController=require('../controllers/teacherController');
const router = express.Router();
router.get('/teacher',(req, res)=>{
    res.render('teacher')
})
router.get('/dashboard',(req, res)=>{
    res.render('dashboard')
})

router.get('/login',(req, res)=>{
    res.render('login');
})
router.get('/register',(req, res)=>{
    res.render('register');
})
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

module.exports = router;