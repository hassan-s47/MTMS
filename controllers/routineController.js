const Student = require('../models/student');
const Song = require('../models/songs');
const Concert = require('../models/concert');
const loadRoutinePage = async (req, res) => {
    id = req.params.id;
    student = await Student.findById(id);
    songs = await Song.find({student: id}).select('pieceName');
    concerts = await Concert.find({students: id}).select(['title','dates']);
    console.log(songs);
    console.log(concerts);
    res.render('routine',{student,concerts,songs});
}

module.exports = {
    loadRoutinePage,
}