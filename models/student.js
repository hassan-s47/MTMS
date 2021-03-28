const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name :{ type: String, required:true},
    email: { type: String, required:true,unique:true },
    gender:{ type: String, required:true },
    dob:{ type: String, required:true },
    address:{ type: String, required:true },
    signinDate:{ type: String, required:true },
    semCount:{ type: Number, required:true },
    instrumentModel:{ type: String, required:true },
    img: 
    { 
        data: Buffer, 
        contentType: String 
    } 
   
},{timestamps : true  });

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;