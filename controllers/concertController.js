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
const viewConcert=async (req, res) => {
    Concert.find({}, (err, items)=>{
        if (err) { 
            console.log(err); 
        } 
        else { 
            // console.log(items);
            res.render('manageConcerts', { items: items }); 
        } 
    })

}
const editConcert=async(req, res)=>{
    concertid=req.params.id;
    Concert.findById(concertid)
    .then((results)=>{
        console.log(results)
        Student.find({})
        .then((result) => {
            
            res.render('editConcert', {students : result,concertData:results});
        })

    })
}
const updateConcert =async (req, res) =>{
    concertid=req.body.concertid
    mystudent=req.body.studentid
    Concert.findByIdAndUpdate({_id:concertid},{
        title :req.body.title,
        location:req.body.location,
        dates:req.body.dates,
        comments :req.body.commentar,
        students:mystudent

    })
    .then((result) =>{

        res.redirect('/concert')
    })
    .catch((err) =>{

        console.log(err)
    })
}
const deleteConcert=async (req, res) => {
    Concert.findByIdAndRemove(req.params.id)
    .then((result) => {
        // console.log(result);          
        res.redirect('/concert');})
    .catch((err) => {console.log(err);  res.redirect('/concert');})
}

module.exports = {
    loadConcertPage,
    addConcert,
    viewConcert,
    editConcert,
    updateConcert,
    deleteConcert

}