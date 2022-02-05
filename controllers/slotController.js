const nodemailer = require('nodemailer');
const { render } = require('ejs');
const Student = require('../models/student');
const Slot = require('../models/slot');
const musicClass = require('../models/class');
const timeTables = require('./timeTable');

const requestAvailablity = (req, res) => {
  Student.find({ 'class': req.body.class }, (err, studentList) => {
    if (err) {
      console.log(err);
    } else {
      studentList.forEach((student) => {
        sendMail(
          req.body.subject,
          req.body.message,
          student._id,
          student.email,
          req.body.class,
        );
      });
      res.render('dashboard');
    }
  });
};
const getWeekSlots = async (teacherID) => {
  const weekSlot = {};
  weekSlot.Monday = await Slot.find({ day: 'Monday', teacher: teacherID });
  weekSlot.Tuesday = await Slot.find({ day: 'Tuesday', teacher: teacherID });
  weekSlot.Wednesday = await Slot.find({ day: 'Wednesday', teacher: teacherID });
  weekSlot.Thursday = await Slot.find({ day: 'Thursday', teacher: teacherID });
  weekSlot.Friday = await Slot.find({ day: 'Friday', teacher: teacherID });
  weekSlot.Saturday = await Slot.find({ day: 'Saturday', teacher: teacherID });
  weekSlot.Sunday = await Slot.find({ day: 'Sunday', teacher: teacherID });

  return weekSlot;
};
const getSlotForm = async (req, res) => {
  if (req.params.id && req.params.classID) {
    const { classID, id } = req.params;
    isStudent = await Student.find({ _id: req.params.id });
    console.log(isStudent);
    if (isStudent.length > 0) {
      isAlreadyRegistered = await Slot.findOne({
        student: req.params.id,
        'class': classID,
      });
      console.log(isAlreadyRegistered);
      if (!isAlreadyRegistered) {
        weekData = await getWeekSlots(req.session.user);
        console.log(weekData);
        res.render('slotForm', {
          id,
          classID,
          weekData,
        });
      } else {
        res.render('responseSubmitted');
      }
    } else {
      console.log('Student Not Registered!');
    }
  }
};
async function sendMail(subject, message, studentID, receiver, classID) {
  const output = `<head>
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
            border: 1px;
            padding:5px;
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
                                                <a href='http://localhost:3000/slotForm/${studentID}&${classID}'>Send Response</a>
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
        `;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'abdullahaslammatrix@gmail.com', // email address
      pass: '4321Abdullah', // generated ethereal password
    },
  });
  // send mail with defined transport object
  const result = await transporter
    .sendMail({
      from: '"Abdullah Aslam 👻" <abdullahaslammatrix@gmail.com>', // sender address
      to: receiver, // list of receivers
      subject, // ✔", // Subject line
      text: message, // plain text body
      html: output, // html body
    })
    .then((resutlt) => {
      console.log(resutlt);
      return true;
    });
  return result;
}

const slotPost = async (req, res) => {
  slots = await Slot.find();
  console.log(slots);

  // slot = new Slot(
  //     {
  //         teacher: req.session.user,
  //         student: req.body.studentID,
  //         startTime: req.body.startTime,
  //         endTime: req.body.endTime,
  //         day: req.body.day
  //     }
  // );

  // slot.save().then((result) => {
  //     res.redirect('/dashboard');
  // })
  // .catch((error) => {
  //     console.log(error);
  // })
};
const blockSlot = (req, res) => {
  musicClass
    .find({ teacher: req.session.user })
    .then((response) => {
      Slot.find({ teacher: req.session.user, status: 'BLOCK' }).then(
        (slots) => {
          console.log(slots);
          res.render('blockSlots', { classes: response, slot: slots });
        },
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAvaiablityPage = (req, res) => {
  musicClass.find({ teacher: req.session.user }).then((response) => {
    res.render('getAvailabilityData', { classes: response });
  });
};
const addSlot = (req, res) => {
  const newSlot = new Slot({
    teacher: req.session.user,
    'class': req.body.class,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    status: 'BLOCK',
  });

  newSlot
    .save()
    .then((success) => {
      res.redirect('/blockSlot');
    })
    .catch((err) => {
      console.log('error');
    });
};
const saveStudentSlot = (req, res) => {
  const newSlot = new Slot({
    teacher: req.session.user,
    student: req.body.studentID,
    'class': req.body.classID,
    day: req.body.day,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    status: 'TAKEN',
  });
  newSlot
    .save()
    .then((success) => {
      res.render('dashboard');
    })
    .catch((err) => {
      console.log('internalServer');
    });
};

const deleteSlot = (req, res) => {
  Slot.findByIdAndDelete(req.params.id)
    .then((sucess) => {
      res.redirect('/blockSlot');
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const verifySlot = (req, res) => {
  if (verifyData(req)) {
    const requestedSlot = {
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      day: req.body.day,
    };
    Slot.find({ teacher: req.session.user }).then((slots) => {
      console.log(slots);
      console.log(requestedSlot);
      const ifvalid = timeTables.checkIfSlotIsValid(slots, requestedSlot);
      console.log(ifvalid);
      res.json({ status: ifvalid });
    });
  }
  console.log(req.body);
};

const getDay = function (day) {
  switch (day) {
    case 'Monday': return 0;
    case 'Tuesday': return 1;
    case 'Wednesday': return 2;
    case 'Thursday': return 3;
    case 'Friday': return 4;
    case 'Saturday': return 5;
    case 'Sunday': return 6;
  }
};

const verifyData = (req) => {
  day = req.body.day;
  if (!day) return false;
  day = getDay(day);
  try {
    s = req.body.startTime;
    e = req.body.endTime;
    start = parseInt(s.split(':')[0]) * 60
    + parseInt(s.split(':')[1])
    + day * 1440;
    end = parseInt(e.split(':')[0]) * 60
    + parseInt(e.split(':')[1])
    + day * 1440;
    if (start % 5 != 0 || end % 5 != 0) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

const getSlotsForTeacher = async (req, res) => {
  result = Slot.find({ teacher: req.session.user });
  console.log(result);
};
module.exports = {
  requestAvailablity,
  getSlotForm,
  slotPost,
  blockSlot,
  addSlot,
  deleteSlot,
  getAvaiablityPage,
  verifySlot,
  saveStudentSlot,
  getSlotsForTeacher,
};
