
const Slot = require("../models/slot");
const Student = require('../models/student');

const loadLessonPage = async (req, res, next) => {
    slotId = req.params.id;
    studentSlot = await Slot.findById(slotId)
    student = await Student.findById(studentSlot.student).select('name');
    console.log(student.name);
    // Load Concert with respect to studentID.
    res.render('lesson');
}

module.exports = {loadLessonPage}