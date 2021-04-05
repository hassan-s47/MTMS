const Concert = require('../models/concert'); 
const Student = require('../models/student'); 

const loadConcertPage = async (req, res) => {
    
    Student.find().select('name')
    .then((result) => {
        console.log(result);
        res.render('createConcert', {students : result});
    })

}

const addConcert = async (req, res) => {
    mystudent=req.body.studentid
    
   const concert=new Concert({

        title :req.body.title,
        location:req.body.location,
        dates:req.body.dates,
        comments :req.body.commentar,
        students:mystudent
                            
    })
   concert.save()
   .then((response) =>{
       res.redirect('/createConcert')
   })
   .catch((err) =>{
       console.error(err)
   })
}

module.exports = {
    loadConcertPage,
    addConcert,
}