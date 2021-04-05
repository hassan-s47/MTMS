const express = require('express');
const teacherController=require('../controllers/teacherController');
const loginController = require('../controllers/loginController');
const albumController = require('../controllers/albumController');
const concertController = require('../controllers/concertController');
const studentController = require('../controllers/studentController');
const router = express.Router();

const redirectLogin = (req, res, next) => {
    if(!req.session.user)
    {
      res.redirect('/');
    }
    else
    next();
      
  }

router.post('/addStudent',redirectLogin, studentController.upload.single('img'),studentController.addStudent)

router.get('/teacher',redirectLogin,(req, res)=>{
    res.render('teacher')
})
router.get('/dashboard',redirectLogin,(req, res)=>{
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


router.get('/calender',redirectLogin,(req, res)=>{
    res.render('calender');
})

router.get('/album',redirectLogin,albumController.getAlbum);

router.get('/album/detail/:id',redirectLogin,albumController.getAlbumDetails)
router.get('/addSong/:id',redirectLogin,albumController.addSongView)

router.post('/addSong',albumController.upload.single('file'),redirectLogin,albumController.addSong)


router.get('/routine',redirectLogin,(req, res) => {
})

router.get('/student',redirectLogin, studentController.showStudent)

router.get('/addStudent',redirectLogin,(req, res)=>{
    res.render('addStudent')
})
router.post('/album',redirectLogin,albumController.upload.single('img'),albumController.createAlbum)
router.get('/concert',redirectLogin,concertController.viewConcert)
router.get('/concert/edit/:id',redirectLogin,concertController.editConcert)
router.get('/concert/delete/:id',redirectLogin,concertController.deleteConcert)
router.post('/update/concert',redirectLogin,concertController.updateConcert)
router.get('/createConcert',redirectLogin,concertController.loadConcertPage)
router.post('/createConcert',redirectLogin,concertController.addConcert)
router.post('/createConcert/',redirectLogin,concertController.addConcert)

router.get('/album/song/delete/:id',redirectLogin,albumController.deleteSong)
router.get('/routine',redirectLogin,(req, res) =>{
    res.render('routine')
})

module.exports = router;