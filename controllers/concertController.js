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
    console.log(req.body);
}

module.exports = {
    loadConcertPage,
    addConcert,
}