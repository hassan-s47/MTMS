const express = require('express');
const teacherController=require('../controllers/teacherController');
const loginController = require('../controllers/loginController');

const albumController = require('../controllers/albumController');

const concertController = require('../controllers/concertController');
const studentController = require('../controllers/studentController');
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

router.get('/album',albumController.getAlbum);

router.get('/album/detail/:id',(req, res)=>{

    res.render('albumDetails');
})
router.get('/addSong',albumController.addSongView)

router.post('/addSong',albumController.addSong)


router.get('/routine',(req, res) => {
    res.render('routine');
})

router.get('/student', studentController.showStudent)

router.get('/addStudent',(req, res)=>{
    res.render('addStudent')
})
router.post('/album',albumController.upload.single('img'),albumController.createAlbum)

router.get('/createConcert',concertController.loadConcertPage)
router.post('/createConcert',concertController.addConcert)
router.post('/createConcert/',concertController.addConcert)

router.get('/routine',(req, res) =>{
    res.render('routine')
})

module.exports = router;