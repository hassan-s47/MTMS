const Concert = require('../models/concert'); 
const Student = require('../models/student'); 
const nodemailer = require('nodemailer');
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
      mystudent.forEach(student => {
          Student.findById(student)
          .then((results)=>{
            sendMail(results.email,req.body.title,req.body.location,req.body.dates)
          })


      })

      res.redirect('/createConcert')

      
   })
   .catch((err) =>{
       console.error(err)
   })
}
async function sendMail(email,title,location,date,comments) {
    const output=`<head>
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'>
</head>
<body style='font-family:Verdana;background:#f2f2f2;color:#606060;'>

    <style>
        h3 {
            font-weight: normal;
            color: #999999;
            margin-bottom: 0;
            font-size: 14px;
        }
        a , h2 {
            color: #6534ff;
        }
        p {
            margin-top: 5px;
            line-height:1.5;
            font-size: 14px;
        }
    </style>

    <table cellpadding='0' width='100%' cellspacing='0' border='0'>
        <tr>
            <td>
                <table cellpadding='0' cellspacing='0' border='0' align='center' width='100%' style='border-collapse:collapse;'>
                    <tr>
                        <td>

                            <div>
                                <table cellpadding='0' cellspacing='0' border='0' align='center'  style='width: 100%;max-width:600px;background:#FFFFFF;margin:0 auto;border-radius:5px;padding:50px 30px'>
                                    <tr>
                                        <td width='100%' colspan='3' align='left' style='padding-bottom:0;'>
                                            <div>
                                                <h2>New Concert Created</h2>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width='100%' align='left' style='padding-bottom:30px;'>
                                            <div>
                                                <p>Hello, your techer just added you in concert.</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width='100%' align='left' style='padding-bottom:20px;'>
                                            <div>
                                                <h3>Title</h3>
                                                <p>${title}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width='100%' align='left' style='padding-bottom:20px;'>
                                            <div>
                                                <h3>Location</h3>
                                                <p>${location}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width='100%' align='left' style='padding-bottom:20px;'>
                                            <div>
                                                <h3>Date-Time</h3>
                                                <p>${date}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div style='margin-top:30px;text-align:center;color:#b3b3b3'>
                                <p style='font-size:12px;'>2020 MTMS ®, All Rights Reserved.</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
        `
        ;
   
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'abdullahaslammatrix@gmail.com', // email address
          pass: '4321Abdullah', // generated ethereal password
        },
      });
             // send mail with defined transport object
             let result = await transporter.sendMail({
              from: '"Abdullah Aslam 👻" <abdullahaslammatrix@gmail.com>', // sender address
              to: email, // list of receivers
              subject: subject, //✔", // Subject line
              text: "Hello world?", // plain text body
              html: output, // html body
            }).then( (resutlt) => {
              console.log(resutlt);
              return true;
            })
            return result; 
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