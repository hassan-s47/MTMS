const Student = require('../models/student'); 
const Slot = require('../models/slot')
const nodemailer = require('nodemailer');
const requestAvailablity=(req,res)=>{


    Student.find({},(err, studentList)=>{
        if (err) { 
            console.log(err); 
        } 
        else { 
            studentList.forEach(student => {
                sendMail(req.body.message,student._id ,student.email)
               });
               res.render('Dashboard')
        } 
    })
  


}

const getSlotForm = async (req,res)=>{
    Slot.findById(req.params.id)
    .then((err,resut) => {
        if(result == null)
        {
            res.render('slotForm',{id});
        }
        else
        {
            res.render('slotForm',{id});
        }
    })
    
}
async function sendMail(message,studentID,receiver) {
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
                                                <h2>Music Management System</h2>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width='100%' align='left' style='padding-bottom:30px;'>
                                            <div>
                                                <p>${message}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td width='100%' align='left' style='padding-bottom:20px;'>
                                            <div>
                                                <a href='http://localhost:3000/slotForm/${studentID}'>Send Response</a>
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
              to: receiver, // list of receivers
              subject: "TEST", //✔", // Subject line
              text: "Hello world?", // plain text body
              html: output, // html body
            }).then( (resutlt) => {
              console.log(resutlt);
              return true;
            })
            return result; 
}

const slotPost = async(req,res) => {
    
}

module.exports={
requestAvailablity,
getSlotForm,
slotPost

}